import { Switch, Route, Redirect } from 'react-router-dom'
import { ROUTES_VALUE, ROUTE_PATHS } from 'app/constants'

/**
 * @info App (05 Mar 2021) // CREATION DATE
 *
 * @comment App - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const App = () => {
  // [TEMPLATE]
  return (
    <Switch>
      {ROUTES_VALUE.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      <Redirect to={ROUTE_PATHS.NOT_FOUND_PATH} />
    </Switch>
  )
}

export default App
