import PropTypes from 'prop-types'
import { Typography } from 'antd'
const { Title } = Typography
/**
 * @info PlanSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanSimpleView - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanSimpleView = (props) => {
  // [INTERFACES]
  const { name } = props

  // [TEMPLATE]
  return (
    <Title display="inline-block" level={3}>
      {name}
    </Title>
  )
}

// [PROPTYPES]
PlanSimpleView.propTypes = {
  name: PropTypes.string.isRequired
}

export default PlanSimpleView
