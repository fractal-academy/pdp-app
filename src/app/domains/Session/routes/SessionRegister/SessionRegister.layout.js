import { SessionSimpleForm } from 'domains/Session/components/forms'
import { Box, Title, Row, Col } from 'antd-styled'
import { Button } from 'antd'
import { getGrid } from '~/utils'
import { useHistory } from 'react-router-dom'
import { ROUTE_PATHS } from 'app/constants'
/**
 * @info SessionRegister (05 Mar 2021) // CREATION DATE
 *
 * @comment SessionRegister - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SessionRegister = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]
  /*
  code sample:
  const singleton = useRef(true) // references also put here
  const [state, setState] = useState({})
  */

  // [HELPER_FUNCTIONS]

  // [COMPUTED_PROPERTIES]
  /* 
    code sample: 
    const userDisplayName = user.firstName + user.lastName
  */

  // [USE_EFFECTS]

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
