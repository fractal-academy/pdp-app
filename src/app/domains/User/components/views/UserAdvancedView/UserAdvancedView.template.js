import PropTypes from 'prop-types'
import { Avatar, Typography } from 'antd'
import { Row, Col, Box } from 'antd-styled'
import { RoleSimpleView } from 'domains/Role/components/views/RoleSimpleView'
import { RoleSingleSelect } from 'domains/Role/components/selects'
import { UserOutlined } from '@ant-design/icons'
import { useSession } from 'contexts/Session/hooks'
import { ROLES } from '~/constants'
const { Title } = Typography

/**
 * @info UserAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAdvancedView - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserAdvancedView = (props) => {
  // [INTERFACES]
  const {
    avatarURL,
    firstName,
    secondName,
    email,
    role,
    withRoleSelect,
    onAvatarClick,
    avatarLeft
  } = props

  // [ADDITIONAL_HOOKS]
  const session = useSession()

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
    <Row
      gutter={[16, 16]}
      flexDirection={!avatarLeft && 'row-reverse'}
      display="inline-flex">
      <Col cursor="pointer">
        <Avatar
          src={avatarURL}
          size={64}
          onClick={onAvatarClick}
          icon={<UserOutlined />}
        />
      </Col>
      <Col
        display="flex"
        flexDirection="column"
        alignItems={!avatarLeft && 'flex-end'}>
        <Title level={4}>{userDisplayName}</Title>

        {withRoleSelect && session.role !== ROLES.STUDENT ? (
          <RoleSingleSelect role={role} onRoleSelect={withRoleSelect} />
        ) : (
          <Box display="inline-flex">
            <RoleSimpleView role={role} />
          </Box>
        )}
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
  avatarLeft: PropTypes.bool,
  withRoleSelect: PropTypes.func,
  onAvatarClick: PropTypes.func
}

export default UserAdvancedView
