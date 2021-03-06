import { useState, useEffect } from 'react'
import { useHistory, useParams, generatePath } from 'react-router-dom'
import { Avatar, List, Space, Button } from 'antd'
import { Row, Col, Card, Title, Text } from 'antd-styled'
import {
  EditOutlined,
  UserOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import moment from 'moment'
import { Spinner, NotFoundPath, Status } from '~/components'
import { PageWrapper } from '~/components/HOC'
import { UserModalWithForm } from 'domains/User/components/combined/modals'
import { CompanySimpleList } from 'domains/Company/components/lists'
import { useSession } from 'contexts/Session/hooks'
import firestore from '~/services/Firebase/firestore'
import { getGrid } from '~/utils'
import { ROLES } from '~/constants'
import { COLLECTIONS, ROUTE_PATHS } from 'app/constants'

/**
 * @info UserShow (05 Mar 2021) // CREATION DATE
 *
 * @comment UserShow - React component.
 *
 * @since 31 Mar 2021 ( v.0.1.4 ) // LAST-EDIT DATE
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
      if (JSON.parse(localStorage.getItem('editProfile'))) {
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
      onBack={id !== session.userId && (() => history.goBack())}
      backBtnLeft={id !== session.userId}
      inlineHeader
      fullWidth>
      <Row gutter={[32, 16]}>
        <Col {...getGrid({ xs: 24, md: 12, lg: 7 })}>
          <Card>
            <Row position="relative" mb={3}>
              <Col mb={2}>
                <Avatar
                  size={80}
                  src={fullUserData.avatarURL}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col>
                <Row justifyContent="center">
                  <Col>
                    <Title level={4}>{userDisplayName}</Title>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text type="secondary">{fullUserData.role}</Text>
                  </Col>
                </Row>
              </Col>
              {(id === session.userId || session.role === ROLES.ADMIN) && (
                <Col position="absolute" right="0">
                  <EditOutlined onClick={showModal} />
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                <Title level={5}>Personal info</Title>
              </Col>
            </Row>
            {fullUserData?.companyIds?.length && (
              <Row mb={2}>
                <Col>
                  <Space>
                    <TeamOutlined />
                    <CompanySimpleList companyIds={fullUserData.companyIds} />
                  </Space>
                </Col>
              </Row>
            )}
            <Row mb={2}>
              <Col>
                <Space>
                  <MailOutlined />
                  <Text type="secondary">{fullUserData.email}</Text>
                </Space>
              </Col>
            </Row>
            {fullUserData?.phone && (
              <Row>
                <Col>
                  <Space>
                    <PhoneOutlined style={{ color: 'secondary' }} />
                    <Text type="secondary">{fullUserData.phone}</Text>
                  </Space>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col {...getGrid({ xs: 24, md: 24, lg: 24, xl: 16 })}>
          <Row>
            <Col span={24}>
              <Title level={4}>Plans</Title>
              {plansLoading ? (
                <Spinner />
              ) : (
                <List
                  split={false}
                  dataSource={plans}
                  renderItem={(plan) => <ListItemPlan plan={plan} />}
                />
              )}
            </Col>
          </Row>
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
  const { id } = useParams()
  const session = useSession()
  const history = useHistory()
  let [mentorData, loadingMentorData] = useCollectionData(
    firestore
      .collection(COLLECTIONS.USERS)
      .where('mentorId', '==', plan.mentorId)
  )

  // [COMPUTED_PROPERTIES]
  mentorData = !loadingMentorData && mentorData[0]

  // [HELPER_FUNCTIONS]
  const goToInterview = () => {
    history.push(generatePath(ROUTE_PATHS.INTERVIEW_EDIT, { id: plan.id }))
  }
  const showResults = () => {
    /**
     * for showing and checking results
     */
    history.push(generatePath(ROUTE_PATHS.INTERVIEW_SHOW, { id: plan.id }))
  }

  // [TEMPLATE]
  if (loadingMentorData) return <Spinner />

  return (
    <List.Item>
      <Card width="100%">
        <Row justifyContent="space-between">
          <Col>
            <Row mb={2}>
              <Col>
                <Space size="large" align="start">
                  <Title level={5}>{plan.name}</Title>
                  <Status status={plan.status} />
                </Space>
              </Col>
            </Row>
            <Row align="middle">
              <Col>
                <Space align="center">
                  <FieldTimeOutlined />
                  <Text display="inline-block">
                    {moment(plan.deadline.toDate()).format('DD.MM.YYYY')}
                  </Text>
                </Space>
              </Col>
              <Col>
                {session.userId === id &&
                  (plan.status === 'active' ? (
                    <Button onClick={goToInterview}>Go to interview</Button>
                  ) : (
                    <Button
                      disabled={plan.status === 'finished'}
                      onClick={showResults}>
                      Show results
                    </Button>
                  ))}
                {session?.mentorId === plan.mentorId && (
                  <Button
                    disabled={plan.status === 'active'}
                    onClick={showResults}>
                    Check results
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={[12, 4]}>
              <Col>
                <Avatar
                  size={45}
                  src={mentorData.avatarURL}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col>
                <Title level={5} style={{ marginBottom: 0 }}>
                  {mentorData.firstName}
                </Title>
                <Text type="secondary">your mentor</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </List.Item>
  )
}
export default UserShow
