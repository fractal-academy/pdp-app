import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { Box, Back } from 'antd-styled'
const { Title } = Typography
/**
 * @info PageTitle (13 Mar 2021) // CREATION DATE
 *
 * @comment PageTitle - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @param {string}              props.title                Title for page
 * @param {node} 	              props.action			   Set of React components
 * @param {function} 	          props.onBack			   Function for to go back
 *
 * @return {ReactComponent}
 */

const PageTitle = (props) => {
  // [INTERFACES]
  const { onBack, title, action } = props

  // [TEMPLATE]
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}>
      <Box display="flex">
        {onBack && (
          <Box mr={3}>
            <Back onClick={onBack} size="large" />
          </Box>
        )}
        <Title level={2}>{title}</Title>
      </Box>
      <Box>{action && action}</Box>
    </Box>
  )
}

// [PROPTYPES]
PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.array,
  onBack: PropTypes.func
}

export default PageTitle
