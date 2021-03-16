import { useState, useCallback, useEffect } from 'react'
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
 * @since 16 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const ACTION_BUTTONS_MAP = [
  { path: ROUTE_PATHS.MATERIAL_CREATE, text: 'Add materials' },
  { path: ROUTE_PATHS.TODO_CREATE, text: 'Add todos' },
  { path: ROUTE_PATHS.INTERVIEW_CREATE, text: 'Add interview' }
]

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
    history.push(history.location.pathname, undefined)
  }

  const onNext = () => form.submit()

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

      levelMap.push({
        label: levelName,
        value: level,
        isLeaf: false
      })
    }
    setLevelTree(levelMap)
    setLevelMapLoading(false)
  }, [])

  const loadLevel = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    const presetSnapshot = await firestore
      .collection(COLLECTIONS.LEVEL_PRESETS)
      .doc(form.getFieldValue('levelPresetId'))
      .get()

    const selectedPreset = presetSnapshot.data()
    targetOption.children = []

    for (const subLevel of Object.values(
      selectedPreset.levelIds[targetOption.value]
    )) {
      const subLevelSnapshot = await firestore
        .collection(COLLECTIONS.SUB_LEVELS)
        .doc(subLevel)
        .get()

      const subLevelName = subLevelSnapshot.data().name

      targetOption.children.push({ label: subLevelName, value: subLevel })
    }
    targetOption.loading = false

    setLevelTree([...levelTree])
  }

  const onLevelSelect = (value) => {
    if (value.length) {
      setSelectedLevel({ levelId: value[0], subLevelId: value[1] })
    } else {
      setSelectedLevel(false)
    }
  }

  const savePageData = (path) => {
    const formData = form.getFieldsValue()
    history.push(path, {
      selectedLevel,
      levelTree,
      formData,
      prevLocation: history.location.pathname
    })
  }

  const resetLevel = () => {
    setSelectedLevel(null)
    setLevelTree([])
  }

  useEffect(() => {
    history.location.state?.formData &&
      form.setFieldsValue(history.location.state.formData)
  }, [form, history])

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
            defaultValues={history.location.state?.formData}
            resetLevel={resetLevel}
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
                  <Col span={24} display="flex" justifyContent="center">
                    <Cascader
                      size="large"
                      placeholder="Select level"
                      onChange={onLevelSelect}
                      options={levelTree}
                      loadData={loadLevel}
                      defaultValue={Object.values(selectedLevel)}
                    />
                  </Col>
                  {selectedLevel && (
                    <>
                      <Col span={24} display="flex" justifyContent="center">
                        <Box display="flex" justifyContent="flex-end">
                          <Space>
                            {ACTION_BUTTONS_MAP.map((data) => (
                              <Button
                                key={data.path}
                                size="large"
                                onClick={() => savePageData(data.path)}>
                                {data.text}
                              </Button>
                            ))}
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
