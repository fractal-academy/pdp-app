import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd-styled'
import { Navigation, Spinner } from '~/components'
import { SessionLogin, SessionRegister } from 'domains/Session/routes'
import RoleProvider from './contexts/Role/components'
import { useSession } from 'contexts/Session/hooks'
import { useAuthListener } from '~/hooks'
import { ROUTES_VALUES, ROUTE_PATHS } from 'app/constants'

/**
 * @info App (05 Mar 2021) // CREATION DATE
 *
 * @comment App - React component.
 *
 * @since 23 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const App = () => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()

  const { loading } = useAuthListener()

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
