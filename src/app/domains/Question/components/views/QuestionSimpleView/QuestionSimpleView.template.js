import PropTypes from 'prop-types'
import { Text } from 'antd-styled'

/**
 * @info QuestionSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment QuestionSimpleView - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const QuestionSimpleView = (props) => {
  // [INTERFACES]
  const { text, children, textProps } = props

  // [TEMPLATE]
  return (
    <Text ellipsis {...textProps}>
      {text || children}
    </Text>
  )
}

// [PROPTYPES]
QuestionSimpleView.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  textProps: PropTypes.object
}

export default QuestionSimpleView
