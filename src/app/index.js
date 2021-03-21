import { useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { Layout } from 'antd-styled'
import { Navigation, Spinner } from '~/components'
import { ROUTES_VALUES, ROUTE_PATHS } from 'app/constants'
import { useSession } from 'contexts/Session/hooks'
import { SessionLogin, SessionRegister } from 'domains/Session/routes'
import RoleProvider from './contexts/Role/components'
import { useAuthListener } from '~/hooks'

/**
 * @info App (05 Mar 2021) // CREATION DATE
 *
 * @comment App - React component.
 *
 * @since 18 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const App = () => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()
  const history = useHistory()

  const { loading } = useAuthListener()

  useEffect(() => {
    if (session?.role) {
      history.replace(ROUTE_PATHS.START_PAGE_MAP[session?.role])
    }
  }, [history, session])

  if (loading) {
    return <Spinner />
  }
  // [TEMPLATE]
  return (
    <Switch>
      <Route component={SessionLogin} path={ROUTE_PATHS.SESSION_LOGIN} />
      <Route
        component={SessionRegister}
        path={ROUTE_PATHS.SESSION_REGISTRATION}
      />
      <Redirect from="/" to={ROUTE_PATHS.START_PAGE_MAP[session?.role]} exact />

      <Layout>
        <RoleProvider>
          <Navigation />
          <Switch>
            {ROUTES_VALUES.map((route) =>
              route.Component ? (
                <route.Component key={route.Component.name} />
              ) : (
                <Route key={route.path} {...route} />
              )
            )}
          </Switch>
        </RoleProvider>
      </Layout>

      <Redirect to={ROUTE_PATHS.NOT_FOUND_PATH} />
    </Switch>
  )
}

export default App
