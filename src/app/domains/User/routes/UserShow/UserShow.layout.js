import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Space, Button, Avatar, List } from 'antd'
import { Row, Col, Card, Title, Text, Box } from 'antd-styled'
import { PageWrapper } from '~/components/HOC'
import { ROUTE_PATHS } from 'app/constants'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner, NotFoundPath, Status } from '~/components'
import {
  EditOutlined,
  UserOutlined,
  FieldTimeOutlined
} from '@ant-design/icons'
import { useSession } from 'contexts/Session/hooks'
import { ROLES } from '~/constants'
import { UserModalWithForm } from 'domains/User/components/combined/modals'
import { CompanySimpleList } from 'domains/Company/components/lists'
import { getGrid } from '~/utils'
import moment from 'moment'
/**
 * @info UserShow (05 Mar 2021) // CREATION DATE
 *
 * @comment UserShow - React component.
 *
 * @since 29 Mar 2021 ( v.0.1.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserShow = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const { id } = useParams()
  const session = useSession()
  const [userData, userLoading] = useDocumentData(
    firestore.doc(`${COLLECTIONS.USERS}/${id}`)
  )
  const [studentData, studentLoading] = useDocumentData(
    firestore.doc(`${COLLECTIONS.STUDENTS}/${userData?.studentId}`)
  )
  const [plans, plansLoading] = useCollectionData(
    studentData?.studentPlanIds &&
      firestore
        .collection(COLLECTIONS.PLANS)
        .where('id', 'in', studentData.studentPlanIds)
  )

  // [COMPONENT_STATE_HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fullUserData, setFullUserData] = useState()
  const [loading, setLoading] = useState(true)

  // [HELPER_FUNCTIONS]
  const showModal = () => {
    setIsModalVisible(true)
  }
  const action = (
    <Space>
      <Button
        type="primary"
        size="large"
        onClick={() => history.push(ROUTE_PATHS.PLAN_CREATE)}>
        Create plan
      </Button>
    </Space>
  )

  // [COMPUTED_PROPERTIES]
  const userDisplayName =
    userData?.firstName || userData?.secondName
      ? `${userData?.firstName ?? ''} ${userData?.secondName ?? ''}`
      : userData?.email

  const title =
    session.userId === id
      ? 'My profile'
      : !loading &&
        `${userData?.role[0].toUpperCase()}${userData?.role.slice(1)}'s profile`

  const modalTitle = `Edit ${
    id === session.userId ? 'my ' : userData?.firstName ?? userData?.email
  } profile`

  // [USE_EFFECTS]
  useEffect(() => {
    if (!userLoading && !studentLoading) {
      setFullUserData({ ...studentData, ...userData })
      setLoading(false)
      if (!!localStorage.getItem('editProfile')) {
        setIsModalVisible(true)
      }
    }
  }, [studentData, userData, userLoading, studentLoading])

  // [TEMPLATE]
  if (loading) return <Spinner />
  if (!fullUserData) return <NotFoundPath />
  return (
    <PageWrapper
      title={title}
      action={action}
      onBack={() => history.goBack()}
      backBtnLeft
      inlineHeader
      fullWidth>
      <Row gutter={[16, 8]}>
        <Col {...getGrid({ xs: 24, md: 12, lg: 8 })}>
          <Card>
            <Row justifyContent="center" position="relative">
              <Col mb={2}>
                <Avatar
                  size={96}
                  src={fullUserData.avatarURL}
                  icon={<UserOutlined />}
                />
              </Col>
              {(id === session.userId || session.role === ROLES.ADMIN) && (
                <Col position="absolute" right="0">
                  <EditOutlined onClick={showModal} />
                </Col>
              )}
            </Row>
            <Row justifyContent="center">
              <Col>
                <Title level={4}>{userDisplayName}</Title>
              </Col>
            </Row>
            <Row justifyContent="center" mb={3}>
              <Col>
                <Text type="secondary">{fullUserData.role}</Text>
              </Col>
            </Row>
            <Row justifyContent="center">
              <Col>
                <Title level={5}>Personal info</Title>
              </Col>
            </Row>
            {fullUserData?.companyIds?.length && (
              <Row justifyContent="center" mb={2}>
                <Col>
                  <CompanySimpleList companyIds={fullUserData.companyIds} />
                </Col>
              </Row>
            )}
            <Row justifyContent="center" mb={2}>
              <Col>
                <Text type="secondary">{fullUserData.email}</Text>
              </Col>
            </Row>
            {fullUserData?.phone && (
              <Row justifyContent="center">
                <Col>
                  <Text type="secondary">{fullUserData.phone}</Text>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col {...getGrid({ xs: 24, md: 24, lg: 24, xl: 16 })}>
          <Card>
            <Row>
              <Col span={24}>
                <Title level={4}>Plans</Title>
                {plansLoading ? (
                  <Spinner />
                ) : (
                  <List
                    dataSource={plans}
                    renderItem={(plan) => <ListItemPlan plan={plan} />}
                  />
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <UserModalWithForm
        title={modalTitle}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        {...fullUserData}
      />
    </PageWrapper>
  )
}

const ListItemPlan = (props) => {
  // [INTERFACES]
  const { plan } = props

  // [ADDITIONAL_HOOKS]
  let [mentorData, loadingMentorData] = useCollectionData(
    firestore
      .collection(COLLECTIONS.USERS)
      .where('mentorId', '==', plan.mentorId)
  )
  mentorData = !loadingMentorData && mentorData[0]

  // [TEMPLATE]
  console.log(plan)
  if (loadingMentorData) return <Spinner />

  return (
    <List.Item>
      <Card width="100%">
        <Row justifyContent="space-between">
          <Col>
            <Row>
              <Col>
                <Space size="large" align="start">
                  <Title level={5}>{plan.name}</Title>
                  <Status status={plan.status} />
                </Space>
              </Col>
            </Row>
            <Row>
              <Col>
                <Space align="start">
                  <FieldTimeOutlined />
                  <Text display="inline-block">
                    {moment(plan.deadline.toDate()).format('DD.MM.YYYY')}
                  </Text>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col>
            <Space size="middle">
              <Avatar
                size={45}
                src={mentorData.avatarURL}
                icon={<UserOutlined />}
              />
              <Box>
                <Title level={5} mb={0}>
                  {mentorData.firstName}
                </Title>
                <Text type="secondary">your mentor</Text>
              </Box>
            </Space>
          </Col>
        </Row>
      </Card>
    </List.Item>
  )
}
export default UserShow
