import PropTypes from 'prop-types'
import { Tag } from 'antd'
import { Title } from 'antd-styled'

/**
 * @info TechnologySimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologySimpleView - React component.
 *
 * @since 15 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologySimpleView = (props) => {
  // [INTERFACES]
  const { name, tag } = props

  // [TEMPLATE]
  return <>{tag ? <Tag>{name}</Tag> : <Title level={4}>{name}</Title>}</>
}

// [PROPTYPES]
TechnologySimpleView.propTypes = {
  name: PropTypes.string.isRequired,
  tag: PropTypes.bool
}

export default TechnologySimpleView
