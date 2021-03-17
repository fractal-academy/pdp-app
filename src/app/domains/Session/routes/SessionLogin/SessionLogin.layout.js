import { SessionSimpleForm } from 'domains/Session/components/forms'
import { Box, Title, Row, Col } from 'antd-styled'
import { getGrid } from '~/utils'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { ROUTE_PATHS } from 'app/constants'
/**
 * @info SessionLogin (05 Mar 2021) // CREATION DATE
 *
 * @comment SessionLogin - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SessionLogin = () => {
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
              Log in
            </Title>
          </Box>
          <SessionSimpleForm />
          <Button
            type="link"
            onClick={() => history.push(ROUTE_PATHS.SESSION_REGISTRATION)}>
            Do you have not account?
          </Button>
        </Box>
      </Col>
    </Row>
  )
}

export default SessionLogin
