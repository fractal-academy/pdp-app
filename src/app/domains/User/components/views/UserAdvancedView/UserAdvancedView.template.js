import PropTypes from 'prop-types'
import { Avatar, Typography, Col } from 'antd'
import { Row } from 'antd-styled'
import { RoleSimpleView } from 'domains/Role/components/views/RoleSimpleView'
const { Title } = Typography

/**
 * @info UserAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAdvancedView - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserAdvancedView = (props) => {
  // [INTERFACES]
  const { avatarURL, firstName, secondName, email, role, avatarLeft } = props

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
    <Row gutter={[16, 0]} flexDirection={!avatarLeft && 'row-reverse'}>
      <Col>
        <Avatar src={avatarURL} size={64} />
      </Col>
      <Col>
        <Title level={4}>{userDisplayName}</Title>
        <RoleSimpleView role={role} />
      </Col>
    </Row>
  )
}

// [PROPTYPES]
UserAdvancedView.propTypes = {
  avatarURL: PropTypes.string,
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  avatarLeft: PropTypes.bool
}

export default UserAdvancedView
