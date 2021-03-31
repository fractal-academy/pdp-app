import PropTypes from 'prop-types'
import { Content } from 'antd-styled'

/**
 * @info withContent (08 Mar 2021) // CREATION DATE
 *
 * @comment withContent
 *
 * @since 31 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const withContent = (Component) => (props) => {
  return (
    <Content
      bg="#ffffff"
      display="flex"
      flexDirection="column"
      paddingTop={4}
      paddingX={4}>
      <Component {...props} />
    </Content>
  )
}

withContent.propType = {
  Component: PropTypes.func
}

export default withContent
