import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd-styled'
import { Navigation } from '~/components'
import { ROUTES_VALUES, ROUTE_PATHS } from 'app/constants'
import { useSession } from 'contexts/Session/hooks'
import { SessionLogin, SessionRegister } from 'domains/Session/routes'

/**
 * @info App (05 Mar 2021) // CREATION DATE
 *
 * @comment App - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const App = () => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()

  // [TEMPLATE]
  return (
    <Switch>
      <Redirect from="/" to={ROUTE_PATHS.START_PAGE_MAP[session.role]} exact />
      <Route component={SessionLogin} path={ROUTE_PATHS.SESSION_LOGIN} />
      <Route
        component={SessionRegister}
        path={ROUTE_PATHS.SESSION_REGISTRATION}
      />
      <Layout>
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
      </Layout>
      <Redirect to={ROUTE_PATHS.NOT_FOUND_PATH} />
    </Switch>
  )
}

export default App
