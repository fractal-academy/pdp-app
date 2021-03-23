import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { Box, Title, Row, Col } from 'antd-styled'
import { SessionSimpleForm } from 'domains/Session/components/forms'
import { useSession } from 'contexts/Session/hooks'
import { ROUTE_PATHS } from 'app/constants'
import { getGrid } from '~/utils'

/**
 * @info SessionRegister (05 Mar 2021) // CREATION DATE
 *
 * @comment SessionRegister - React component.
 *
 * @since 23 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SessionRegister = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const session = useSession()

  // [USE_EFFECTS]
  useEffect(() => {
    if (session?.role) {
      history.replace(ROUTE_PATHS.START_PAGE_MAP[session?.role])
    }
  }, [history, session])

  // [TEMPLATE]
  return (
    <Row gutter={[8, 16]} justify="center">
      <Col {...getGrid({ xs: 16, sm: 14, md: 10, lg: 9, xl: 7 })}>
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Box mb={3}>
            <Title level={3} display="flex" justifyContent="center">
              Sign in
            </Title>
          </Box>
          <SessionSimpleForm register />
          <Button
            type="link"
            onClick={() => history.push(ROUTE_PATHS.SESSION_LOGIN)}>
            Do you have account?
          </Button>
        </Box>
      </Col>
    </Row>
  )
}

export default SessionRegister
