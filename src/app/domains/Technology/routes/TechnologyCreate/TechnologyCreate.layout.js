import { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Spin, Cascader, Button, Space } from 'antd'
import { Col, Row, Text, Box, Paragraph } from 'antd-styled'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TechnologyAdvancedForm } from 'domains/Technology/components/forms'
import { TechnologyAdvancedCascader } from 'domains/Technology/components/combined/cascader'
import { PageWrapper } from '~/components/HOC'
import { COLLECTIONS } from 'app/constants'
import * as ROUTE_PATHS from 'app/constants/routePaths'
import firestore from '~/services/Firebase/firestore'

/**
 * @info TechnologyCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyCreate - React component.
 *
 * @since 18 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const ACTION_BUTTONS_MAP = [
  { path: ROUTE_PATHS.MATERIAL_CREATE, text: 'Add materials' },
  { path: ROUTE_PATHS.TODO_CREATE, text: 'Add todos' },
  { path: ROUTE_PATHS.INTERVIEW_CREATE, text: 'Add interview' }
]

const getIds = (ref) => {
  const ids = []
  if (ref) {
    for (const subLevel of Object.keys(ref)) {
      ids.push(...ref[subLevel].map(({ id }) => id))
    }
    return ids
  }
}

const TechnologyCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const [mainForm] = Form.useForm()

  const historyState = history.location.state

  // [COMPONENT_STATE_HOOKS]
  const [levelTree, setLevelTree] = useState(historyState?.levelTree || [])
  const [levelMapLoading, setLevelMapLoading] = useState(false)
  const [creationLoading, setCreationLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(
    historyState?.selectedLevel || null
  )

  // [HELPER_FUNCTIONS]
  const onSubmit = async (value) => {
    setCreationLoading(true)

    savePageData(history.location.pathname, value)
    let technology = {
      name: value.name,
      type: value.type,
      materialIds: {},
      todoIds: {},
      interviewIds: {}
    }
    try {
      // Deep copy of object for disconnected from the historyState
      const prepareData = JSON.parse(JSON.stringify(historyState))

      const levelPresetSnapshot = await firestore
        .collection(COLLECTIONS.LEVEL_PRESETS)
        .doc(value.levelPresetId)
        .get()
      const levelPreset = levelPresetSnapshot.data()

      technology.levelIds = levelPreset.levelIds

      for (const level of Object.keys(levelPreset.levelIds)) {
        const materialsRef = prepareData?.materialIds?.[level]
        const todosRef = prepareData?.todoIds?.[level]
        const interviewRef = prepareData?.questionIds?.[level]

        getIds(materialsRef)

        if (materialsRef) {
          getIds(materialsRef).forEach(
            (id) => (technology.materialIds[id] = true)
          )
        }
        if (todosRef) {
          getIds(todosRef).forEach((id) => (technology.todoIds[id] = true))
        }

        if (interviewRef) {
          let interview = {
            technologyId: historyState.technologyId,
            levelIds: { levelId: level }
          }
          prepareData.interviewIds = {}
          prepareData.interviewIds[level] = {}
          for (const subLevel of Object.keys(interviewRef)) {
            interview.questionIds = interviewRef[subLevel].map(({ id }) => id)
            interview.levelIds = { ...interview.levelIds, subLevelId: subLevel }
            const interviewSnapshot = await firestore
              .collection(COLLECTIONS.INTERVIEWS)
              .add({})
            interview.id = interviewSnapshot.id
            await firestore
              .collection(COLLECTIONS.INTERVIEWS)
              .doc(interview.id)
              .set(interview)

            technology.interviewIds[interview.id] = true
          }
        }
      }

      await firestore
        .collection(COLLECTIONS.TECHNOLOGIES)
        .doc(historyState.technologyId)
        .set(technology)
      history.replace(ROUTE_PATHS.TECHNOLOGIES_ALL, undefined)
    } catch (error) {
      console.log('create technology', error)
    }

    // history.push(history.location.pathname, undefined)
    setCreationLoading(false)
  }

  // -- Header step button functions --
  const onNext = () => mainForm.submit()
  const onCancel = async () => {
    try {
      await firestore
        .collection(COLLECTIONS.TECHNOLOGIES)
        .doc(historyState.technologyId)
        .delete()
    } catch (e) {
      console.log(e)
    }
    resetLevel()

    //TODO clear todos, interview and materials in FB

    history.push(ROUTE_PATHS.TECHNOLOGIES_ALL, undefined)
  }
  // ----------------------------------

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
      .doc(mainForm.getFieldValue('levelPresetId'))
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

  const savePageData = (path, data) => {
    const formData = data || mainForm.getFieldsValue()
    history.push(path, {
      ...historyState,
      selectedLevel,
      levelTree,
      formData,
      prevLocation: history.location.pathname
    })
  }

  const resetLevel = () => {
    setSelectedLevel(null)
    setLevelTree([])
    mainForm.resetFields()
  }

  // [USE_EFFECTS]
  useEffect(() => {
    historyState?.formData && mainForm.setFieldsValue(historyState.formData)
  }, [mainForm, historyState])

  useEffect(() => {
    //TODO need to set initLoading
    const initTechnology = async () => {
      try {
        const technology = await firestore
          .collection(COLLECTIONS.TECHNOLOGIES)
          .add({})
        history.push(history.location.pathname, {
          ...historyState,
          technologyId: technology.id
        })
      } catch (error) {
        console.log('init technology', error)
      }
    }
    !historyState?.technologyId && initTechnology()
  }, [])


  // [TEMPLATE]
  return (
    <PageWrapper
      title="Create technology"
      nextBtnProps={{ text: 'Create', loading: creationLoading }}
      backBtnProps={{ text: 'Cancel' }}
      onNext={onNext}
      onBack={onCancel}>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <TechnologyAdvancedForm
            onSubmit={onSubmit}
            form={mainForm}
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
                      defaultValue={
                        selectedLevel && Object.values(selectedLevel)
                      }
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
