import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Space, Button } from 'antd'
import { Row, Col, Card, Title, Text } from 'antd-styled'
import { PageWrapper } from '~/components/HOC'
import { ROUTE_PATHS } from 'app/constants'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner, NotFoundPath } from '~/components'
import { UserAdvancedView } from 'domains/User/components/views'
import { EditOutlined } from '@ant-design/icons'
import { useSession } from 'contexts/Session/hooks'
import { ROLES } from '~/constants'
import { UserModalWithForm } from 'domains/User/components/combined/modals'
/**
 * @info UserShow (05 Mar 2021) // CREATION DATE
 *
 * @comment UserShow - React component.
 *
 * @since 23 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserShow = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const { id } = useParams()
  const session = useSession()

  const [userData, loading] = useDocumentData(
    firestore.doc(`${COLLECTIONS.USERS}/${id}`)
  )

  // [COMPONENT_STATE_HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)

  // [COMPUTED_PROPERTIES]
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

  const title =
    session.id === id
      ? 'My profile'
      : !loading &&
        `${userData?.role[0].toUpperCase()}${userData?.role.slice(1)}'s profile`

  // [HELPER_FUNCTIONS]
  const showModal = () => {
    setIsModalVisible(true)
  }

  // [TEMPLATE]
  if (loading) return <Spinner />
  if (!userData) return <NotFoundPath />
  return (
    <PageWrapper
      title={title}
      action={action}
      onBack={() => history.goBack()}
      backBtnLeft
      inlineHeader
      fullWidth>
      <Row>
        <Col span={6}>
          <Row gutter={[0, 16]}>
            <Col flex={1}>
              <Card>
                <Row gutter={[0, 16]} justifyContent="space-between">
                  <Col display="flex">
                    <UserAdvancedView {...userData} avatarLeft fullInfo />
                    {(id === session.id || session.role === ROLES.ADMIN) && (
                      <EditOutlined onClick={showModal} />
                    )}
                  </Col>
                  {userData?.companyId && (
                    <Col xxl={{ span: 11 }}>
                      <Row>
                        <Col xs={{ span: 24 }}>
                          <Space
                            size={4}
                            split={<Text type="secondary">•</Text>}>
                            <Text type="secondary" strong>
                              {userData.companyId}
                            </Text>
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </Row>
              </Card>
            </Col>
            <Col flex={1}>
              <Card>
                <Title level={3}>Competences</Title>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col flex={1}>
          <Row gutter={[0, 16]}>
            {['Skills', 'Experience', 'Plans'].map((infoBlock) => (
              <Col span={24}>
                <Card height={200}>
                  <Title level={3}>{infoBlock}</Title>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <UserModalWithForm
        id={id}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        {...userData}
      />
    </PageWrapper>
  )
}

export default UserShow
