import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Content } from 'antd-styled'
import { Navigation } from '~/components'
import { ROUTES_VALUES, ROUTE_PATHS } from 'app/constants'
import { useSession } from 'contexts/Session/hooks'
/**
 * @info App (05 Mar 2021) // CREATION DATE
 *
 * @comment App - React component.
 *
 * @since 07 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const App = () => {
  const session = useSession()
  // [TEMPLATE]
  console.log(session.role)
  return (
    <Layout>
      <Navigation />
      <Content bg="#ffffff" paddingTop={4} paddingX={4}>
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
      </Content>
    </Layout>
  )
}

export default App
