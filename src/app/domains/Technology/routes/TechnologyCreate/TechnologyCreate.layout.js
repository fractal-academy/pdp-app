import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Spin, Cascader, Button, Space } from 'antd'
import { Col, Row, Text, Box, Paragraph } from 'antd-styled'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TechnologyAdvancedForm } from 'domains/Technology/components/forms'
import { TechnologyAdvancedCascader } from 'domains/Technology/components/combined/cascader'
import { PageWrapper } from '~/components/HOC'
import { COLLECTIONS, ROUTE_PATHS } from 'app/constants'
import firestore from '~/services/Firebase/firestore'

/**
 * @info TechnologyCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyCreate - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const [form] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  const [levelTree, setLevelTree] = useState(
    history.location.state?.levelTree || []
  )
  const [levelMapLoading, setLevelMapLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(
    history.location.state?.selectedLevel || null
  )
  // [HELPER_FUNCTIONS]
  const onSubmit = (value) => {
    console.log(value)
  }

  const onNext = () => {
    // history.push(ROUTE_PATHS.TODO_CREATE)
    form.submit()
  }

  // [HELPER_FUNCTIONS]

  // TODO sort in right order
  const onPresetSelect = useCallback(async (value) => {
    setLevelMapLoading(true)
    setLevelTree([])
    setSelectedLevel(false)
    const presetSnapshot = await firestore
      .collection(COLLECTIONS.LEVEL_PRESETS)
      .doc(value)
      .get()

    const selectedPreset = presetSnapshot.data()

    const levelMap = []

    for (const level of Object.keys(selectedPreset.levelIds)) {
      const levelSnapshot = await firestore
        .collection(COLLECTIONS.LEVELS)
        .doc(level)
        .get()

      const levelName = levelSnapshot.data().name

      levelMap.push({ label: levelName, value: level, children: [] })

      for (const subLevel of Object.values(selectedPreset.levelIds[level])) {
        const subLevelSnapshot = await firestore
          .collection(COLLECTIONS.SUB_LEVELS)
          .doc(subLevel)
          .get()

        const subLevelName = subLevelSnapshot.data().name
        levelMap
          .find(({ value }) => value === level)
          .children.push({ label: subLevelName, value: subLevel })
      }
    }
    setLevelTree(levelMap)
    setLevelMapLoading(false)
  }, [])

  const onLevelSelect = (value) => {
    if (value.length) {
      setSelectedLevel({ levelId: value[0], subLevelId: value[1] })
    } else {
      setSelectedLevel(false)
    }
  }
  // [TEMPLATE]
  return (
    <PageWrapper
      title="Create technology"
      onNext={onNext}
      nextBtnProps={{ text: 'Create' }}>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <TechnologyAdvancedForm
            onSubmit={onSubmit}
            form={form}
            onPresetSelect={onPresetSelect}
          />
        </Col>

        <Col span={24}>
          {levelMapLoading && (
            <Box display="flex" justifyContent="center">
              <Spin />
            </Box>
          )}
          {!!levelTree.length && (
            <Space direction="vertical">
              <Paragraph>
                Here you can configure technologies levels. Add materials or
                todos which helps students in learning. Set required
                technologies.
              </Paragraph>
              <Form>
                <Row gutter={[8, 16]}>
                  <Col flex={1}>
                    <Cascader
                      size="large"
                      placeholder="Select level"
                      onChange={onLevelSelect}
                      options={levelTree}
                    />
                  </Col>
                  {selectedLevel && (
                    <>
                      <Col flex={1}>
                        <Box display="flex" justifyContent="flex-end">
                          <Space>
                            <Button
                              size="large"
                              onClick={() =>
                                history.push(ROUTE_PATHS.MATERIAL_CREATE, {
                                  selectedLevel,
                                  levelTree,
                                  prevLocation: history.location.pathname
                                })
                              }>
                              Add materials
                            </Button>
                            <Button
                              size="large"
                              onClick={() =>
                                history.push(ROUTE_PATHS.TODO_CREATE, {
                                  selectedLevel,
                                  levelTree,
                                  prevLocation: history.location.pathname
                                })
                              }>
                              Add todos
                            </Button>
                          </Space>
                        </Box>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="vertical"
                          align="center"
                          style={{ width: '100%' }}>
                          <Text>Required technologies: </Text>
                          <Form.List
                            name="requiredTechnologies"
                            style={{ flex: 1 }}>
                            {(fields, { add, remove }) => (
                              <Space direction="vertical">
                                {fields.map((field) => (
                                  <Box
                                    key={field.key}
                                    display="flex"
                                    justifyContent="center">
                                    <Space align="baseline">
                                      <TechnologyAdvancedCascader />
                                      <MinusCircleOutlined
                                        onClick={() => remove(field.name)}
                                      />
                                    </Space>
                                  </Box>
                                ))}
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={add}
                                    block
                                    icon={<PlusOutlined />}>
                                    Add field
                                  </Button>
                                </Form.Item>
                              </Space>
                            )}
                          </Form.List>
                        </Space>
                      </Col>
                    </>
                  )}
                </Row>
              </Form>
            </Space>
          )}
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default TechnologyCreate
