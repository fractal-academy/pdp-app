import PropTypes from 'prop-types'
import { Box } from 'antd-styled'
import style from './Status.style'
/**
 * @info Status (14 Mar 2021) // CREATION DATE
 *
 * @comment Status - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const STATUS = {
  finished: '#ff8c19',
  active: '#f6dd45',
  confirmed: '#87d068'
}

const Status = (props) => {
  // [INTERFACES]
  const { status, ...rest } = props

  // [TEMPLATE]
  return (
    <Box style={style(STATUS[status])} {...rest}>
      {status}
    </Box>
  )
}

// [PROPTYPES]
Status.propTypes = {
  status: PropTypes.string.isRequired,
  rest: PropTypes.object
}

export default Status
