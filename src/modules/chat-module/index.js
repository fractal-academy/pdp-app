import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES_VALUES } from 'chat-module/constants'
import { ROUTE_PATHS } from 'app/constants'
/**
 * @info ChatModule (05 Mar 2021) // CREATION DATE
 *
 * @comment ChatModule - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const ChatModuleRoutes = () => {
  // [TEMPLATE]
  return (
    <Switch>
      {ROUTES_VALUES.map((route) => (
        <Route key={route.path} {...route} />
      ))}

      <Redirect to={ROUTE_PATHS.NOT_FOUND_PATH} />
    </Switch>
  )
}

export default ChatModuleRoutes
