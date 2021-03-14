import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Space, Button, Avatar } from 'antd'
import { Row, Col, Card, Title, Text } from 'antd-styled'
import { PageWrapper } from '~/components/HOC'
import { ROUTE_PATHS } from 'app/constants'
/**
 * @info UserShow (05 Mar 2021) // CREATION DATE
 *
 * @comment UserShow - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_USER = {
  key: '2',
  id: 'asdf',
  avatarURL:
    'https://firebasestorage.googleapis.com/v0/b/expenses-senseteq.appspot.com/o/photo_2020-11-27_19-32-45.jpg?alt=media&token=75958d4d-46ab-458f-b413-e81696c8c16d',
  firstName: 'Fractal',
  secondName: 'Band2',
  email: 'email@gmail.com',
  role: 'admin',
  companyId: 'Senseteq'
}

const UserShow = (props) => {
  // [INTERFACES]
  /*
  code sample:
  const { data } = props
  */

  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]
  /*
  code sample:
  const singleton = useRef(true) // references also put here
  const [state, setState] = useState({})
  */

  // [HELPER_FUNCTIONS]

  // [COMPUTED_PROPERTIES]
  const action = (
    <Space>
      <Button
        size="large"
        onClick={() => history.push(ROUTE_PATHS.PLAN_CREATE)}>
        Create plan
      </Button>
    </Space>
  )

  // [USE_EFFECTS]

  // [TEMPLATE]
  return (
    <PageWrapper
      title="Student profile"
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
                <Row gutter={[0, 16]}>
                  <Col display="flex" justifyContent="center" flex={1}>
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 168,
                        xxl: 192
                      }}
                      src={MOCK_USER.avatarURL}
                    />
                  </Col>
                  <Col flex={1}>
                    <Title level={5}>Name</Title>
                    <Text type="secondary" strong>
                      {MOCK_USER.firstName} {MOCK_USER.secondName}
                    </Text>
                  </Col>
                  <Col flex={1}>
                    <Title level={5}>Company</Title>
                    <Space size={4} split={<Text type="secondary">•</Text>}>
                      <Text type="secondary" strong>
                        {MOCK_USER.companyId}
                      </Text>
                      <Text
                        type="secondary"
                        style={{ textTransform: 'capitalize' }}>
                        {MOCK_USER.role}
                      </Text>
                    </Space>
                  </Col>
                  <Col flex={1}>
                    <Title level={5}>Email</Title>
                    <Text type="secondary" strong>
                      {MOCK_USER.email}
                    </Text>
                  </Col>
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
    </PageWrapper>
  )
}

// [PROPTYPES]
UserShow.propTypes = {}

export default UserShow
