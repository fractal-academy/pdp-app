import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tree, List, Dropdown, Menu } from 'antd'
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
  FolderViewOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import { Spinner } from '~/components'
import { PageWrapper } from '~/components/HOC'
import { LevelSimpleCascader } from 'domains/Level/components/combined/cascaders'
import { useSession } from 'contexts/Session/hooks'
import {
  createDocument,
  deleteDocument,
  getCollectionRef,
  getDocumentData,
  getDocumentRef,
  setDocument,
  updateDocument
} from '~/services/Firebase/firestore'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'

/**
 * @info PlanCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanCreate - React component.
 *
 * @since 29 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const session = useSession()
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
  const onAssign = async () => {
    setCreationLoading(true)
    try {
      for (const technology of historyState.selectedTech) {
        const techId = getDocumentRef(COLLECTIONS.TECHNOLOGIES).id
        const collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}`

        const techData = {
          id: techId,
          name: technology.title,
          levelId: technology.selectedLevel
        }

        if (technology.todoIds) {
          const { levelId, subLevelId } = technology.selectedLevel
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
            }
            techData.todoIds[todo.id] = true
          }
        }
        if (technology.materialIds) {
          const { levelId, subLevelId } = technology.selectedLevel
          techData.materialIds = technology.materialIds[levelId][subLevelId]
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
        mentorId: session.userId
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
            onNext={onAssign}
            nextBtnProps={{
              text: 'Assign',
              disabled:
                _.dropRightWhile(selectedTech, (o) => !o.selectedLevel)
                  .length !== selectedTech.length,
              loading: creationLoading
            }}
            backBtnLeft
            inlineHeader>
            <HeadingPrimary title="Overview" titleSize={3} />
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

  const technologyData = await getDocumentData(
    COLLECTIONS.TECHNOLOGIES,
    technology.key
  )

  for (const todoKey of Object.keys(technologyData.todoIds)) {
    const todo = technologyData.todoIds[todoKey]
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
const loadMaterials = async (technology, selectedLevel) => {}

const loadQuestions = async (technology, selectedLevel) => {}

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
  const [loading, setLoading] = useState('')

  // [HELPER_FUNCTIONS]
  const onLevelSelect = (value, tree) => {
    if (value.length) {
      const currentLevel = { levelId: value[0], subLevelId: value[1] }
      setSelectedLevel(currentLevel)
      historyState.selectedTech[index] = {
        ...historyState.selectedTech[index],
        selectedLevel: currentLevel,
        tree
      }
      history.replace(history.location.pathname, historyState)
    } else {
      setSelectedLevel(null)
      currentTech.selectedLevel = null
      history.replace(history.location.pathname, historyState)
    }
  }

  const loadData = async (name, route, callback) => {
    setLoading(name)

    const data = await callback(technology, selectedLevel)

    history.replace(route, {
      ...historyState,
      selectedLevel,
      prevLocation: history.location.pathname,
      technologyId: technology.key,
      ...data
    })
    setLoading('')
  }

  // [COMPUTED_PROPERTIES]
  const DROPDOWN_MAP = [
    {
      name: 'Todos',
      route: ROUTE_PATHS.TODO_CREATE,
      icon: <FileTextOutlined />,
      func: (name, route) => loadData(name, route, loadTodos)
    },
    {
      name: 'Materials',
      route: ROUTE_PATHS.MATERIAL_CREATE,
      icon: <FolderViewOutlined />,
      func: (name, route) => loadData(name, route, loadMaterials)
    },
    {
      name: 'Interviews',
      route: ROUTE_PATHS.INTERVIEW_CREATE,
      icon: <FileDoneOutlined />,
      func: (name, route) => loadData(name, route, loadQuestions)
    }
  ]

  const menu = (
    <Menu>
      {DROPDOWN_MAP.map((item) => (
        <Menu.Item
          icon={loading === item.name ? <LoadingOutlined /> : item.icon}
          onClick={async () => {
            await item.func?.(item.name, item.route)
          }}>
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
          <Edit type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ]}>
      <Text>{technology.title}</Text>
    </List.Item>
  )
}

export default PlanCreate
