import PropTypes from 'prop-types'
import { Avatar, Row, Typography, Col } from 'antd'
const { Title, Text } = Typography

/**
 * @info UserSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleView - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserSimpleView = (props) => {
  // [INTERFACES]
  const { avatarURL, firstName, secondName, email, role } = props

  // [ADDITIONAL_HOOKS]
  /*
  code sample: 
  const firestore = useFirestore()
  */

  // [COMPONENT_STATE_HOOKS]
  /*
  code sample:
  const singleton = useRef(true) // references also put here
  const [state, setState] = useState({})
  */

  // [HELPER_FUNCTIONS]

  // [COMPUTED_PROPERTIES]
  const userDisplayName =
    firstName && secondName
      ? `${firstName} ${secondName}`
      : firstName
      ? firstName
      : secondName
      ? secondName
      : email

  // [USE_EFFECTS]

  // [TEMPLATE]
  return (
    <>
      {role ? (
        <Row gutter={[16, 0]}>
          <Col>
            <Avatar src={avatarURL} size={64} />
          </Col>
          <Col>
            <Title level={4}>{userDisplayName}</Title>
            <Text type="secondary">{role}</Text>
          </Col>
        </Row>
      ) : (
        <Row gutter={[16, 0]} align="middle">
          <Col>
            <Avatar src={avatarURL} size={'large'} />
          </Col>
          <Col>
            <Title level={5}>{userDisplayName}</Title>
          </Col>
        </Row>
      )}
    </>
  )
}

// [PROPTYPES]
UserSimpleView.propTypes = {
  avatarURL: PropTypes.string,
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string
}

export default UserSimpleView
