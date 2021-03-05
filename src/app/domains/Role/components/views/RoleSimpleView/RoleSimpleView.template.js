import PropTypes from 'prop-types'
import { Typography } from 'antd'
const { Text } = Typography

/**
 * @info RoleSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment RoleSimpleView - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const RoleSimpleView = (props) => {
  // [INTERFACES]
  const { role } = props

  // [TEMPLATE]
  return <Text type="secondary">{role}</Text>
}

// [PROPTYPES]
RoleSimpleView.propTypes = {
  role: PropTypes.string
}

export default RoleSimpleView
