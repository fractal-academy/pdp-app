import { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Spin, Button, Space } from 'antd'
import { Col, Row, Text, Box, Paragraph } from 'antd-styled'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TechnologyAdvancedForm } from 'domains/Technology/components/forms'
import { TechnologyAdvancedCascader } from 'domains/Technology/components/combined/cascader'
import { LevelSimpleCascader } from 'domains/Level/components/combined/cascaders'
import { PageWrapper } from '~/components/HOC'
import {
  getDocumentData,
  getDocumentRef,
  setDocument
} from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import * as ROUTE_PATHS from 'app/constants/routePaths'

/**
 * @info TechnologyCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyCreate - React component.
 *
 * @since 24 Mar 2021 ( v.0.0.9 ) // LAST-EDIT DATE
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
      ids.push(
        ...ref[subLevel].map(({ id }) => ({
          id,
          subLevel
        }))
      )
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

    // Init technology data object
    let technology = {
      id: historyState.technologyId,
      name: value.name,
      type: value.type
    }

    try {
      // Deep copy of object for disconnect from the historyState
      const prepareData = JSON.parse(JSON.stringify(historyState))

      const levelPreset = await getDocumentData(
        COLLECTIONS.LEVEL_PRESETS,
        value.levelPresetId
      )

      technology.levelIds = levelPreset.levelIds

      for (const level of Object.keys(levelPreset.levelIds)) {
        const materialsRef = prepareData?.materialIds?.[level]
        const todosRef = prepareData?.todoIds?.[level]
        const interviewRef = prepareData?.questionIds?.[level]

        getIds(materialsRef)

        if (materialsRef) {
          technology.materialIds = {}
          getIds(materialsRef).forEach(
            ({ id, subLevel }) =>
              (technology.materialIds[id] = {
                levelId: level,
                subLevelId: subLevel
              })
          )
        }
        if (todosRef) {
          technology.todoIds = {}
          getIds(todosRef).forEach(
            ({ id, subLevel }) =>
              (technology.todoIds[id] = {
                levelId: level,
                subLevelId: subLevel
              })
          )
        }

        if (interviewRef) {
          technology.interviewIds = {}
          let interview = {
            technologyId: historyState.technologyId,
            levelIds: { levelId: level }
          }
          prepareData.interviewIds = {}
          prepareData.interviewIds[level] = {}
          for (const subLevel of Object.keys(interviewRef)) {
            interview.questionIds = interviewRef[subLevel].map(({ id }) => id)
            interview.levelIds = { ...interview.levelIds, subLevelId: subLevel }

            interview.id = getDocumentRef(COLLECTIONS.INTERVIEWS).id

            await setDocument(COLLECTIONS.INTERVIEWS, interview.id, interview)

            technology.interviewIds[interview.id] = {
              levelId: level,
              subLevelId: subLevel
            }
          }
        }
      }

      await setDocument(
        COLLECTIONS.TECHNOLOGIES,
        historyState.technologyId,
        technology
      )

      history.replace(ROUTE_PATHS.TECHNOLOGIES_ALL, undefined)
    } catch (error) {
      console.log('create technology', error)
    }

    setCreationLoading(false)
  }

  // -- Header step button functions --
  const onNext = () => mainForm.submit()
  const onCancel = async () => {
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

    const selectedPreset = await getDocumentData(
      COLLECTIONS.LEVEL_PRESETS,
      value
    )

    const levelMap = []

    for (const level of Object.keys(selectedPreset.levelIds)) {
      const levelData = await getDocumentData(COLLECTIONS.LEVELS, level)

      levelMap.push({
        label: levelData.name,
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

    const selectedPreset = await getDocumentData(
      COLLECTIONS.LEVEL_PRESETS,
      mainForm.getFieldValue('levelPresetId')
    )
    targetOption.children = []

    for (const subLevel of Object.values(
      selectedPreset.levelIds[targetOption.value]
    )) {
      const subLevelData = await getDocumentData(
        COLLECTIONS.SUB_LEVELS,
        subLevel
      )
      targetOption.children.push({ label: subLevelData.name, value: subLevel })
    }
    targetOption.loading = false

    setLevelTree([...levelTree])
  }

  const onLevelSelect = (value) => {
    if (value.length) {
      setSelectedLevel({ levelId: value[0], subLevelId: value[1] })
    } else {
      setSelectedLevel(null)
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
        const technologyId = await getDocumentRef(COLLECTIONS.TECHNOLOGIES).id
        history.push(history.location.pathname, {
          ...historyState,
          technologyId: technologyId
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
                    <LevelSimpleCascader
                      onLevelSelect={onLevelSelect}
                      levelTree={levelTree}
                      loadLevel={loadLevel}
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
