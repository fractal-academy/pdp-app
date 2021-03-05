import ROUTE_PATHS from './routePaths'
import { ChatAll, ChatShow } from 'chat-module/domains/Chat/routes'

const ROUTES = {
  CHAT_ALL: {
    component: ChatAll,
    path: ROUTE_PATHS.CHAT_ALL,
    exact: true
  },
  CHAT_SHOW: {
    component: ChatShow,
    path: ROUTE_PATHS.CHAT_SHOW
  }
}

const ROUTES_VALUES = Object.values(ROUTES)
const ROUTES_KEYS = Object.keys(ROUTES)

export default ROUTES
export { ROUTES_VALUES, ROUTES_KEYS }
