import { useHistory } from 'react-router-dom'
import { Button, Result } from 'antd'
import { Box } from 'antd-styled'
import { useSession } from 'contexts/Session/hooks'
import { ReactComponent as AccessDeniedIcon } from '~/assets/access_denied.svg'
import * as ROUTE_PATHS from 'app/constants/routePaths'

/**
 * @info AccessDenied (05 Mar 2021) // CREATION DATE
 *
 * @comment AccessDenied - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const AccessDenied = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const session = useSession()

  // [HELPER_FUNCTIONS]
  const goToHome = () => {
    history.replace(ROUTE_PATHS.START_PAGE_MAP[session.role])
  }

  // [TEMPLATE]
  return (
    <Result
      icon={
        <Box display="flex" justifyContent="center">
          <AccessDeniedIcon height="256px" />
        </Box>
      }
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={goToHome}>
          Back Home
        </Button>
      }
    />
  )
}

export default AccessDenied
