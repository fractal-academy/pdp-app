import PropTypes from 'prop-types'
import { Avatar, Row, Typography, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title } = Typography
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
  const { avatarURL, firstName, secondName, email } = props

  // [COMPUTED_PROPERTIES]
  const userDisplayName =
    firstName && secondName
      ? `${firstName} ${secondName}`
      : firstName
      ? firstName
      : secondName
      ? secondName
      : email

  // [TEMPLATE]
  return (
    <Row gutter={[16, 0]} align="middle">
      <Col>
        <Avatar src={avatarURL} size={'large'} icon={<UserOutlined />} />
      </Col>
      <Col>
        <Title level={5}>{userDisplayName}</Title>
      </Col>
    </Row>
  )
}

// [PROPTYPES]
UserSimpleView.propTypes = {
  avatarURL: PropTypes.string,
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  email: PropTypes.string.isRequired
}

export default UserSimpleView
