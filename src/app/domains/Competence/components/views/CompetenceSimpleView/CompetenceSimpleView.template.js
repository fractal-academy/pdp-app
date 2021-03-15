import PropTypes from 'prop-types'
import { Typography } from 'antd'
const { Title } = Typography
/**
 * @info CompetenceSimpleView (07 Mar 2021) // CREATION DATE
 *
 * @comment CompetenceSimpleView - React component.
 *
 * @since 15 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompetenceSimpleView = (props) => {
  // [INTERFACES]
  const { name } = props

  // [TEMPLATE]
  return <Title level={3}>{name}</Title>
}

// [PROPTYPES]
CompetenceSimpleView.propTypes = {
  name: PropTypes.string.isRequired
}

export default CompetenceSimpleView
