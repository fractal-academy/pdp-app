import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Content } from 'antd-styled'
import { Navigation } from '~/components'
import { ROUTES_VALUES, ROUTE_PATHS } from 'app/constants'

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
  // [TEMPLATE]
  return (
    <Layout>
      <Navigation />
      <Content bg="#ffffff">
        <Switch>
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
