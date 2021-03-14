import PropTypes from 'prop-types'
import { Box } from 'antd-styled'
import style from './Status.style'
/**
 * @info Status (14 Mar 2021) // CREATION DATE
 *
 * @comment Status - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const STATUS = {
  complete: '#f94848',
  active: '#f6dd45',
  confirm: '#87d068'
}

const Status = (props) => {
  // [INTERFACES]
  const { status } = props

  // [TEMPLATE]
  return <Box style={{ ...style(STATUS[status]) }}>{status}</Box>
}

// [PROPTYPES]
Status.propTypes = {
  status: PropTypes.string.isRequired
}

export default Status
