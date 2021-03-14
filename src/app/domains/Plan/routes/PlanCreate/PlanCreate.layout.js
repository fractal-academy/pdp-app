import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tree, List } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import {
  Content,
  Paragraph,
  Sider,
  Text,
  Title,
  HeadingPrimary,
  Edit,
  Remove
} from 'antd-styled'
import { PageWrapper } from '~/components/HOC'
import _ from 'lodash'
import { EditOutlined } from '@ant-design/icons'
import { ROUTE_PATHS } from 'app/constants'

/**
 * @info PlanCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanCreate - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_DATA = [
  {
    title: 'Software design',
    key: uuidv4(),
    children: [
      {
        title: 'Angular developer',
        key: uuidv4(),
        children: [
          { title: 'JavaScript', key: uuidv4() },
          { title: 'Angular', key: uuidv4() },
          { title: 'TypeScript', key: uuidv4() },
          { title: 'HTML', key: uuidv4() },
          { title: 'CSS', key: uuidv4() }
        ]
      },
      {
        title: 'React developer',
        key: uuidv4(),
        children: [
          { title: 'JavaScript', key: uuidv4() },
          { title: 'React', key: uuidv4() },
          { title: 'CSS', key: uuidv4() }
        ]
      },
      {
        title: 'Backend developer',
        key: uuidv4(),
        children: [
          { title: 'JavaScript', key: uuidv4() },
          { title: 'HTML', key: uuidv4() },
          { title: 'Node.js', key: uuidv4() },
          { title: 'Express.js', key: uuidv4() }
        ]
      }
    ]
  },
  {
    title: 'User experience design',
    key: uuidv4(),
    children: [
      {
        title: 'UI/UX Designer',
        key: uuidv4(),
        children: [
          { title: 'Figma', key: uuidv4() },
          { title: 'Color palette', key: uuidv4() },
          { title: 'SWG animation', key: uuidv4() },
          { title: 'CSS', key: uuidv4() },
          { title: 'HTML', key: uuidv4() }
        ]
      }
    ]
  },
  {
    title: 'Innovation',
    key: uuidv4(),
    children: [{ title: 'Management', key: uuidv4() }]
  }
]

const PlanCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]
  const [technologies, setTechnologies] = useState([])
  const [isOverview, setIsOverview] = useState(false)

  // [HELPER_FUNCTIONS]
  const onAssign = () => {}
  const onCheck = (item, { checkedNodes }) => {
    const filteredTech = checkedNodes.filter(
      (technology) => !technology.hasOwnProperty('children')
    )

    setTechnologies(_.uniqBy(filteredTech, 'title'))
  }

  // [TEMPLATE]
  return (
    <>
      {!isOverview ? (
        <>
          <Content bg="#ffffff" paddingTop={4} paddingX={4}>
            <PageWrapper
              title="Create plan for Dima"
              titleProps={{ textAlign: 'left' }}
              onNext={() => setIsOverview(!isOverview)}
              onBack={() => history.goBack()}
              nextBtnProps={{ text: 'Overview' }}
              backBtnLeft
              inlineHeader
              fullWidth>
              <Tree checkable treeData={MOCK_DATA} onCheck={onCheck} />
            </PageWrapper>
          </Content>
          <Sider width="fit-content" paddingTop={4} paddingX={4}>
            <Title level={3} style={{ color: 'white' }}>
              Selected technologies
            </Title>

            {technologies.map((technology) => (
              <Paragraph key={technology.key} style={{ color: 'white' }}>
                {technology.title}
              </Paragraph>
            ))}
          </Sider>
        </>
      ) : (
        <Content bg="#ffffff" paddingTop={4} paddingX={4}>
          <PageWrapper
            title="Create plan for Dima"
            titleProps={{ textAlign: 'left' }}
            onBack={() => setIsOverview(!isOverview)}
            onNext={onAssign}
            nextBtnProps={{ text: 'Assign' }}
            backBtnLeft
            inlineHeader>
            <HeadingPrimary title="Overview" titleSize={3} />
            <List
              dataSource={technologies}
              renderItem={(technology) => (
                <List.Item
                  actions={[
                    <Edit
                      shape="default"
                      tooltip="Edit"
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => history.push(ROUTE_PATHS.TODO_CREATE)}
                    />
                  ]}>
                  <Text>{technology.title}</Text>
                </List.Item>
              )}
            />
          </PageWrapper>
        </Content>
      )}
    </>
  )
}

export default PlanCreate
