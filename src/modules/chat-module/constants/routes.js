import * as ROUTE_PATHS from './routePaths'
import { ChatAll, ChatShow } from 'chat-module/domains/Chat/routes'
import { withProtect } from '~/components/HOC'
import { ROLES } from '~/constants'

const ROUTES = {
  CHAT_ALL: {
    component: withProtect({ roles: [ROLES.MENTOR, ROLES.STUDENT] })(ChatAll),
    path: ROUTE_PATHS.CHATS_ALL,
    exact: true
  },
  CHAT_SHOW: {
    component: ChatShow,
    path: ROUTE_PATHS.CHAT_SHOW,
    exact: true
  }
}

const ROUTES_VALUES = Object.values(ROUTES)
const ROUTES_KEYS = Object.keys(ROUTES)

export default ROUTES
export { ROUTES_VALUES, ROUTES_KEYS }
