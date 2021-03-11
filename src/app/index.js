import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd-styled'
import { Navigation } from '~/components'
import { ROUTES_VALUES, ROUTE_PATHS } from 'app/constants'
import { useSession } from 'contexts/Session/hooks'

/**
 * @info App (05 Mar 2021) // CREATION DATE
 *
 * @comment App - React component.
 *
 * @since 11 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const App = () => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()

  // [TEMPLATE]
  return (
    <Layout>
      <Navigation />
      <Switch>
        <Redirect
          from="/"
          to={ROUTE_PATHS.START_PAGE_MAP[session.role]}
          exact
        />
        {ROUTES_VALUES.map((route) =>
          route.Component ? (
            <route.Component key={route.Component.name} />
          ) : (
            <Route key={route.path} {...route} />
          )
        )}
        <Redirect to={ROUTE_PATHS.NOT_FOUND_PATH} />
      </Switch>
    </Layout>
  )
}

export default App
