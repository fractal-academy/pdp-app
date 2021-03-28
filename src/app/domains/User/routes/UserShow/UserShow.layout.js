import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Space, Button } from 'antd'
import { Row, Col, Card, Title, Text } from 'antd-styled'
import { PageWrapper } from '~/components/HOC'
import { ROUTE_PATHS } from 'app/constants'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner, NotFoundPath } from '~/components'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { useSession } from 'contexts/Session/hooks'
import { ROLES } from '~/constants'
import { UserModalWithForm } from 'domains/User/components/combined/modals'
import Avatar from 'antd/lib/avatar/avatar'
import { CompanySimpleList } from 'domains/Company/components/lists'
/**
 * @info UserShow (05 Mar 2021) // CREATION DATE
 *
 * @comment UserShow - React component.
 *
 * @since 28 Mar 2021 ( v.0.0.8 ) // LAST-EDIT DATE
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
    session.id === id
      ? 'My profile'
      : !loading &&
        `${userData?.role[0].toUpperCase()}${userData?.role.slice(1)}'s profile`

  const modalTitle = `Edit ${
    id === session.id ? 'my ' : userData?.firstName + "'s" || userData.email
  } profile`

  // [USE_EFFECTS]
  useEffect(() => {
    if (!userLoading && !studentLoading) {
      setFullUserData({ ...studentData, ...userData })
      setLoading(false)
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
        <Col span={7}>
          <Card>
            <Row justifyContent="center" position="relative">
              <Col mb={2}>
                <Avatar
                  size={96}
                  src={fullUserData.avatarURL}
                  icon={<UserOutlined />}
                />
              </Col>
              {
                <Col position="absolute" right="0">
                  {(id === session.id || session.role === ROLES.ADMIN) && (
                    <EditOutlined onClick={showModal} />
                  )}
                </Col>
              }
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

        <Col>
          <Card>
            <Row justifyContent="center">
              <Col>
                <Title level={4}>Skills</Title>
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

export default UserShow
