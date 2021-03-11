import * as ROUTE_PATHS from './routePaths'
import { ChatAll, ChatShow } from 'chat-module/domains/Chat/routes'
import { withProtect, withContent } from '~/components/HOC'
import { ROLES } from '~/constants'

const ROUTES = {
  CHAT_ALL: {
    component: withContent(
      withProtect({ roles: [ROLES.MENTOR, ROLES.STUDENT] })(ChatAll)
    ),
    path: ROUTE_PATHS.CHATS_ALL,
    exact: true
  },
  CHAT_SHOW: {
    component: withContent(
      withProtect({ roles: [ROLES.MENTOR, ROLES.STUDENT] })(ChatShow)
    ),
    path: ROUTE_PATHS.CHAT_SHOW,
    exact: true
  }
}

const ROUTES_VALUES = Object.values(ROUTES)
const ROUTES_KEYS = Object.keys(ROUTES)

export default ROUTES
export { ROUTES_VALUES, ROUTES_KEYS }
