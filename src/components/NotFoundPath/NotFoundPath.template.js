import { useHistory } from 'react-router-dom'
import { Box } from 'antd-styled'
import { Button, Result } from 'antd'
import { useSession } from 'contexts/Session/hooks'
import { ReactComponent as NotFound } from '~/assets/page_not_found.svg'
import * as ROUTE_PATHS from 'app/constants/routePaths'

/**
 * @info NotFoundPath (05 Mar 2021) // CREATION DATE
 *
 * @comment NotFoundPath - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const NotFoundPath = () => {
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
          <NotFound height="256px" />
        </Box>
      }
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={goToHome}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFoundPath
