import { Box } from 'antd-styled'
import { ReactComponent as NotFound } from '~/assets/page_not_found.svg'

/**
 * @info NotFoundPath (05 Mar 2021) // CREATION DATE
 *
 * @comment NotFoundPath - React component.
 *
 * @since 09 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const NotFoundPath = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    width="100%"
    height="100%">
    <NotFound height="256px" />
  </Box>
)

export default NotFoundPath
