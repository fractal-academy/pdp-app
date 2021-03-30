import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tree, List, Dropdown, Menu, Form } from 'antd'
import {
  Content,
  Paragraph,
  Sider,
  Text,
  Title,
  HeadingPrimary,
  Edit
} from 'antd-styled'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import _ from 'lodash'
import {
  EllipsisOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FolderViewOutlined
} from '@ant-design/icons'
import { Spinner } from '~/components'
import { PageWrapper } from '~/components/HOC'
import { PlanSimpleForm } from 'domains/Plan/components/forms'
import { LevelSimpleCascader } from 'domains/Level/components/combined/cascaders'
import { useSession } from 'contexts/Session/hooks'
import {
  createDocument,
  deleteDocument,
  getCollectionRef,
  getDocumentData,
  getDocumentRef,
  getTimestamp,
  setDocument,
  updateDocument
} from '~/services/Firebase/firestore'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'

/**
 * @info PlanCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanCreate - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.8 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const session = useSession()
  const [planForm] = Form.useForm()
  const historyState = history.location.state

  // [COMPONENT_STATE_HOOKS]
  const [selectedTech, setSelectedTech] = useState(
    historyState?.selectedTech ?? []
  )
  const [isOverview, setIsOverview] = useState(
    historyState?.isOverview ?? false
  )
  const [pageLoading, setPageLoading] = useState(true)
  const [creationLoading, setCreationLoading] = useState(false)
  const [technologies] = useCollectionData(
    getCollectionRef(COLLECTIONS.TECHNOLOGIES)
  )

  // [HELPER_FUNCTIONS]
  const onSubmit = async (formData) => {
    setCreationLoading(true)
    try {
      for (const technology of historyState.selectedTech) {
        const techId = getDocumentRef(COLLECTIONS.TECHNOLOGIES).id
        const collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}`
        const { levelId, subLevelId } = technology.selectedLevel

        const techData = {
          id: techId,
          name: technology.title,
          levelId: technology.selectedLevel
        }

        if (technology.todoIds) {
          techData.todoIds = {}
          for (const todo of technology.todoIds[levelId][subLevelId]) {
            if (todo.readOnly) {
              const todoId = getDocumentRef(COLLECTIONS.TODOS).id
              const todoData = {
                ...todo,
                id: todoId
              }
              await setDocument(
                `${collectionPath}/${COLLECTIONS.TODOS}`,
                todoId,
                todoData
              )
              techData.todoIds[todoId] = true
            } else {
              techData.todoIds[todo.id] = true
            }
          }
        }
        if (technology.questionIds) {
          techData.interviewIds = {}
          const interviewId = getDocumentRef(COLLECTIONS.INTERVIEWS).id
          const interviewData = {
            id: interviewId,
            technologyId: techId,
            levelIds: technology.selectedLevel,
            questionIds: []
          }
          for (const question of technology.questionIds[levelId][subLevelId]) {
            if (question.createdAt) {
              const questionId = getDocumentRef(COLLECTIONS.QUESTIONS).id
              const questionData = {
                ...question,
                id: questionId
              }
              await setDocument(
                `${collectionPath}/${COLLECTIONS.QUESTIONS}`,
                questionId,
                questionData
              )
              interviewData.questionIds.push(questionId)
            } else {
              interviewData.questionIds.push(question.id)
            }
          }
          await setDocument(
            `${collectionPath}/${COLLECTIONS.INTERVIEWS}`,
            interviewId,
            interviewData
          )

          techData.interviewIds[interviewId] = true
        }
        if (technology.materialIds) {
          techData.materialIds = {}
          for (const material of technology.materialIds[levelId][subLevelId]) {
            if (material.readOnly) {
              const materialId = getDocumentRef(COLLECTIONS.MATERIALS).id
              delete material.uid
              const materialData = { ...material, id: materialId }
              await setDocument(
                `${collectionPath}/${COLLECTIONS.MATERIALS}`,
                materialId,
                materialData
              )
              techData.materialIds[materialId] = true
            } else {
              techData.materialIds[material.id] = true
            }
          }
        }
        await setDocument(
          `${collectionPath}/${COLLECTIONS.TECHNOLOGIES}`,
          techId,
          techData
        )
      }

      const planData = {
        id: historyState.planId,
        status: 'active',
        mentorId: session.mentorId,
        name: formData.name ?? '',
        deadline: getTimestamp().fromDate(formData.deadline.toDate())
      }
      await setDocument(COLLECTIONS.PLANS, planData.id, planData)

      let studentPlanIds = historyState?.student?.studentPlanIds ?? []

      studentPlanIds.push(planData.id)

      await updateDocument(COLLECTIONS.STUDENTS, historyState.student.id, {
        studentPlanIds
      })

      history.replace(ROUTE_PATHS.STUDENTS_ALL)
    } catch (error) {
      console.log('plan creation', error)
    }
    setCreationLoading(false)
  }
  const onCheck = (item, { checkedNodes }) => {
    //TODO save checked technologies
    const filteredTech = checkedNodes.filter(
      (technology) => !technology.hasOwnProperty('children')
    )
    const selectedTechnologies = _.uniqBy(filteredTech, 'title')
    setSelectedTech(selectedTechnologies)
    history.replace(history.location.pathname, {
      ...historyState,
      selectedTech: selectedTechnologies
    })
  }
  const changeOverview = () => {
    setIsOverview(!isOverview)
    history.replace(history.location.pathname, {
      ...historyState,
      isOverview: !isOverview
    })
  }

  // [COMPUTED_PROPERTIES]
  const student = historyState.student
  const pageTitle = `Create plan for ${student.firstName ?? 'student'}`

  // [USE_EFFECTS]
  useEffect(() => {
    if (historyState.technologies) {
      setPageLoading(false)
    }
    if (technologies && !historyState.technologies) {
      setPageLoading(true)
      const fetchStudent = async () => {
        const studentData = await getDocumentData(
          COLLECTIONS.STUDENTS,
          student.id
        )

        const userData = await getDocumentData(
          COLLECTIONS.USERS,
          studentData.userId
        )
        const planRef = await createDocument(COLLECTIONS.PLANS)
        const technologiesTree = technologies.map((tech) => ({
          title: tech.name,
          key: tech.id
        }))

        history.replace(history.location.pathname, {
          ...historyState,
          student: { ...userData, ...studentData },
          planId: planRef.id,
          technologies: technologiesTree
        })
        setPageLoading(false)
      }

      fetchStudent()
    }
  }, [technologies])

  console.log(historyState)

  // [TEMPLATE]
  if (pageLoading) {
    return <Spinner />
  }

  return (
    <>
      {!isOverview ? (
        <>
          <Content bg="#ffffff" paddingTop={4} paddingX={4}>
            <PageWrapper
              title={pageTitle}
              titleProps={{ textAlign: 'left' }}
              onNext={changeOverview}
              onBack={async () => {
                await deleteDocument(COLLECTIONS.PLANS, historyState.planId)
                history.goBack()
              }}
              nextBtnProps={{
                text: 'Overview',
                disabled: !selectedTech.length
              }}
              backBtnLeft
              inlineHeader
              fullWidth>
              <Tree
                checkable
                treeData={historyState.technologies}
                checkedKeys={selectedTech.map(({ key }) => key)}
                onCheck={onCheck}
              />
            </PageWrapper>
          </Content>
          <Sider width="fit-content" paddingTop={4} paddingX={4}>
            <Title level={3} style={{ color: 'white' }}>
              Selected technologies
            </Title>

            {selectedTech.map((technology) => (
              <Paragraph key={technology.key} style={{ color: 'white' }}>
                {technology.title}
              </Paragraph>
            ))}
          </Sider>
        </>
      ) : (
        <Content bg="#ffffff" paddingTop={4} paddingX={4}>
          <PageWrapper
            title={pageTitle}
            titleProps={{ textAlign: 'left' }}
            onBack={changeOverview}
            onNext={() => planForm.submit()}
            nextBtnProps={{
              text: 'Assign',
              disabled:
                _.dropRightWhile(selectedTech, (o) => !o.selectedLevel)
                  .length !== selectedTech.length ||
                historyState.techTemplateLoading,
              loading: creationLoading
            }}
            backBtnLeft
            inlineHeader>
            <HeadingPrimary title="Plan information" titleSize={3} />
            <PlanSimpleForm form={planForm} onFinish={onSubmit} />
            <HeadingPrimary title="Technologies" titleSize={3} />
            <List
              dataSource={selectedTech}
              renderItem={(technology, index) => (
                <ListItem technology={technology} index={index} />
              )}
            />
          </PageWrapper>
        </Content>
      )}
    </>
  )
}

const loadTodos = async (technology, selectedLevel) => {
  const todos = []

  for (const todoKey of Object.keys(technology.todoIds)) {
    const todo = technology.todoIds[todoKey]
    if (
      todo.levelId === selectedLevel.levelId &&
      todo.subLevelId === selectedLevel.subLevelId
    ) {
      const todoData = await getDocumentData(COLLECTIONS.TODOS, todoKey)
      todos.push(todoData)
    }
  }

  _.sortBy(todos, 'createdAt')

  const todoIds = {
    [selectedLevel.levelId]: { [selectedLevel.subLevelId]: todos }
  }
  return { todoIds }
}

const loadInterview = async (technology, selectedLevel) => {
  const questions = []

  for (const interviewKey of Object.keys(technology.interviewIds)) {
    const interview = technology.interviewIds[interviewKey]
    if (
      interview.levelId === selectedLevel.levelId &&
      interview.subLevelId === selectedLevel.subLevelId
    ) {
      const interviewData = await getDocumentData(
        COLLECTIONS.INTERVIEWS,
        interviewKey
      )

      for (const questionKey of interviewData.questionIds) {
        const questionData = await getDocumentData(
          COLLECTIONS.QUESTIONS,
          questionKey
        )
        questions.push(questionData)
      }
    }
  }

  const questionIds = {
    [selectedLevel.levelId]: { [selectedLevel.subLevelId]: questions }
  }
  return { questionIds }
}

const loadMaterials = async (technology, selectedLevel) => {
  const materials = []

  for (const materialKey of Object.keys(technology.materialIds)) {
    const material = technology.materialIds[materialKey]
    if (
      material.levelId === selectedLevel.levelId &&
      material.subLevelId === selectedLevel.subLevelId
    ) {
      const materialData = await getDocumentData(
        COLLECTIONS.MATERIALS,
        materialKey
      )

      materials.push({ ...materialData, uid: materialKey })
    }
  }

  const materialIds = {
    [selectedLevel.levelId]: { [selectedLevel.subLevelId]: materials }
  }
  return { materialIds }
}

const ListItem = (props) => {
  // [INTERFACES]
  const { technology, index } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state
  const currentTech = historyState.selectedTech?.[index]

  // [COMPONENT_STATE_HOOKS]
  const [selectedLevel, setSelectedLevel] = useState(
    currentTech?.selectedLevel ?? null
  )
  const [dataLoading, setDataLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onLevelSelect = async (value, tree) => {
    if (value.length) {
      history.replace(history.location.pathname, {
        ...historyState,
        techTemplateLoading: true
      })
      setDataLoading(true)
      const currentLevel = { levelId: value[0], subLevelId: value[1] }
      setSelectedLevel(currentLevel)
      let newHistoryState

      const technologyData = await getDocumentData(
        COLLECTIONS.TECHNOLOGIES,
        technology.key
      )

      const todos =
        technologyData.todoIds &&
        (await loadTodos(technologyData, currentLevel))
      const questions =
        technologyData.interviewIds &&
        (await loadInterview(technologyData, currentLevel))
      const materials =
        technologyData.materialIds &&
        (await loadMaterials(technologyData, currentLevel))

      historyState.selectedTech[index] = {
        ...historyState.selectedTech[index],
        selectedLevel: currentLevel,
        tree,
        ...todos,
        ...questions,
        ...materials
      }

      newHistoryState = {
        ...historyState,
        selectedLevel: currentLevel,
        prevLocation: history.location.pathname,
        techTemplateLoading: true,
        ...todos,
        ...questions,
        ...materials
      }

      delete newHistoryState.techTemplateLoading
      history.replace(history.location.pathname, newHistoryState)
      setDataLoading(false)
    } else {
      setSelectedLevel(null)
      setDataLoading(false)
      currentTech.selectedLevel = null
      history.replace(history.location.pathname, historyState)
    }
  }

  // [COMPUTED_PROPERTIES]
  const DROPDOWN_MAP = [
    {
      name: 'Todos',
      route: ROUTE_PATHS.TODO_CREATE,
      icon: <FileTextOutlined />
    },
    {
      name: 'Materials',
      route: ROUTE_PATHS.MATERIAL_CREATE,
      icon: <FolderViewOutlined />
    },
    {
      name: 'Interviews',
      route: ROUTE_PATHS.INTERVIEW_CREATE,
      icon: <FileDoneOutlined />
    }
  ]

  const menu = (
    <Menu>
      {DROPDOWN_MAP.map((item) => (
        <Menu.Item
          icon={item.icon}
          onClick={() =>
            history.replace(item.route, {
              ...historyState,
              selectedLevel,
              prevLocation: history.location.pathname,
              technologyId: technology.key
            })
          }>
          <Text>{item.name}</Text>
        </Menu.Item>
      ))}
    </Menu>
  )

  // [TEMPLATE]
  return (
    <List.Item
      actions={[
        <LevelSimpleCascader
          size="small"
          bordered={false}
          loadFrom={COLLECTIONS.TECHNOLOGIES}
          defaultTree={currentTech?.tree}
          defaultValue={selectedLevel && Object.values(selectedLevel)}
          onLevelSelect={onLevelSelect}
          docId={technology.key}
        />,

        <Dropdown overlay={menu} disabled={!selectedLevel}>
          <Edit type="text" loading={dataLoading} icon={<EllipsisOutlined />} />
        </Dropdown>
      ]}>
      <Text>{technology.title}</Text>
    </List.Item>
  )
}

export default PlanCreate
