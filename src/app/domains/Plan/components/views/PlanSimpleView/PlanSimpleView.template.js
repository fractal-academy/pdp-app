import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { Box } from 'antd-styled'
const { Title } = Typography
/**
 * @info PlanSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanSimpleView - React component.
 *
 * @since 15 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanSimpleView = (props) => {
  // [INTERFACES]
  const { name, ...rest } = props

  // [TEMPLATE]
  return (
    <Box display="inline-block" {...rest}>
      <Title level={3}>{name}</Title>
    </Box>
  )
}

// [PROPTYPES]
PlanSimpleView.propTypes = {
  name: PropTypes.string.isRequired
}

export default PlanSimpleView
