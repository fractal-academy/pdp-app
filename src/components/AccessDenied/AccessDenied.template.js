import { Box, Title } from 'antd-styled'
import { ReactComponent as AccessDeniedIcon } from '~/assets/access_denied.svg'

/**
 * @info AccessDenied (05 Mar 2021) // CREATION DATE
 *
 * @comment AccessDenied - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const AccessDenied = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    width="100%"
    height="100%">
    <Title>Access Denied</Title>
    <AccessDeniedIcon height="256px" />
  </Box>
)

export default AccessDenied
