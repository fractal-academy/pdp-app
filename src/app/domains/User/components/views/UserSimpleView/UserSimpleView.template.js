import PropTypes from 'prop-types'
import { Avatar, Row, Typography, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useHistory, generatePath } from 'react-router-dom'
import { ROUTE_PATHS } from 'app/constants'
const { Title } = Typography
/**
 * @info UserSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleView - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserSimpleView = (props) => {
  // [INTERFACES]
  const { id, avatarURL, firstName, secondName, email, withAvatar } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()

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
      gutter={[16, 0]}
      align="middle"
      onClick={() =>
        history.push(generatePath(ROUTE_PATHS.USER_SHOW, { id: id }))
      }>
      {withAvatar && (
        <Col cursor={'pointer'}>
          <Avatar src={avatarURL} size={'large'} icon={<UserOutlined />} />
        </Col>
      )}
      <Col>
        <Title level={5}>{userDisplayName}</Title>
      </Col>
    </Row>
  )
}

// [PROPTYPES]
UserSimpleView.propTypes = {
  id: PropTypes.string,
  avatarURL: PropTypes.string,
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  email: PropTypes.string.isRequired,
  withAvatar: PropTypes.bool
}

export default UserSimpleView
