import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { Box } from 'antd-styled'
const { Title } = Typography
/**
 * @info PageTitle (13 Mar 2021) // CREATION DATE
 *
 * @comment PageTitle - React component.
 *
 * @since 13 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @param {string}              props.title                Title for page
 * @param {node} 	            props.action			   Set of React components
 *
 * @return {ReactComponent}
 */

const PageTitle = (props) => {
  // [INTERFACES]
  const { title, action } = props

  // [TEMPLATE]
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}>
      <Box>
        <Title>{title}</Title>
      </Box>
      <Box>{action && action}</Box>
    </Box>
  )
}

// [PROPTYPES]
PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.array
}

export default PageTitle
