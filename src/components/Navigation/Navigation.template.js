import { useState, useEffect } from 'react'
import { Box, Sider } from 'antd-styled'
import { Divider, Menu } from 'antd'
import { useHistory, useRouteMatch, generatePath } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { UserAdvancedView } from 'domains/User/components/views'
import { ROLES } from '~/constants'
import * as ROUTE_PATHS from 'app/constants/routePaths'
import { ROUTE_PATHS as CHAT_ROUTE_PATHS } from 'chat-module/constants'
import { useSession, useSessionDispatch } from 'contexts/Session/hooks'
import TYPES from '~/app/contexts/Session/types'
import { useRole } from 'contexts/Role/hooks'
import auth from '~/services/Firebase/auth'
import * as styles from './Navigation.style'

/**
 * @info Navigation (05 Mar 2021) // CREATION DATE
 *
 * @comment Navigation - React component.
 *
 * @since 29 Mar 2021 ( v.0.0.10 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MENU_ITEMS = {
  [ROLES.ADMIN]: {
    USER: {
      title: 'Users',
      route: ROUTE_PATHS.START_PAGE_MAP[ROLES.ADMIN]
    },
    // COMPETENCES: {
    //   title: 'Competences',
    //   route: ROUTE_PATHS.COMPETENCES_ALL
    // },
    TECHNOLOGIES: {
      title: 'Technologies',
      route: ROUTE_PATHS.TECHNOLOGIES_ALL
    }
  },
  [ROLES.MENTOR]: {
    STUDENTS: {
      title: 'Students',
      route: ROUTE_PATHS.START_PAGE_MAP[ROLES.MENTOR]
    },
    INTERVIEWS: {
      title: 'Interviews',
      route: generatePath(ROUTE_PATHS.INTERVIEWS_ALL, { role: ROLES.MENTOR })
    }
    // CHATS: {
    //   title: 'Chats',
    //   route: generatePath(CHAT_ROUTE_PATHS.CHATS_ALL, { role: ROLES.MENTOR })
    // }
  },
  [ROLES.STUDENT]: {
    MY_PLANS: {
      title: 'My Plans',
      route: ROUTE_PATHS.START_PAGE_MAP[ROLES.STUDENT]
    },
    INTERVIEWS: {
      title: 'Interviews',
      route: generatePath(ROUTE_PATHS.INTERVIEWS_ALL, { role: ROLES.STUDENT })
    }
    // CHATS: {
    //   title: 'Chats',
    //   route: generatePath(CHAT_ROUTE_PATHS.CHATS_ALL, { role: ROLES.STUDENT })
    // }
  }
}

const Navigation = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const session = useSession()
  const { role, setRole } = useRole()
  const match = useRouteMatch(ROUTE_PATHS.START_PAGE_MAP[role])
  const sessionDispatch = useSessionDispatch()

  // [COMPONENT_STATE_HOOKS]
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    history.location.pathname || ROUTE_PATHS.START_PAGE_MAP[role]
  )

  // [HELPER_FUNCTIONS]
  const goToProfile = () =>
    history.push(generatePath(ROUTE_PATHS.USER_SHOW, { id: session.userId }))
  const onLogOut = () => {
    try {
      auth.signOut()
      history.push(ROUTE_PATHS.SESSION_LOGIN)
      sessionDispatch({
        type: TYPES.SIGN_OUT
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  // [COMPUTED_PROPERTIES]
  const roleMenu = Object.values(MENU_ITEMS[role])

  // [USE_EFFECTS]
  useEffect(() => {
    setSelectedMenuItem(
      history.location.pathname || ROUTE_PATHS.START_PAGE_MAP[role]
    )
  }, [role, history.location, match])

  // [TEMPLATE]
  return (
    <Sider
      display="flex"
      height="100vh"
      width="fit-content"
      bg="#EFF4F8"
      paddingTop={4}>
      <Box display="flex" flexDirection="column" height="100%">
        <Box paddingX={4} marginBottom={4}>
          <UserAdvancedView
            {...session}
            role={role}
            onAvatarClick={goToProfile}
            withRoleSelect={(value) => {
              setRole(value)
              history.push(ROUTE_PATHS.START_PAGE_MAP[value])
            }}
            avatarLeft
          />
        </Box>
        <Box paddingX={4}>
          <Divider>Menu</Divider>
        </Box>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          style={styles.menuStyle}
          onClick={({ key }) => setSelectedMenuItem(key)}>
          {roleMenu.map((menuItem) => (
            <Menu.Item
              style={styles.menuItemStyle}
              key={menuItem.route}
              onClick={() => history.push(menuItem.route)}>
              {menuItem.title}
            </Menu.Item>
          ))}
        </Menu>

        <Box display="flex" flex={1}>
          <Box alignSelf="flex-end" width="100%">
            <Menu style={styles.menuStyle} selectable={false}>
              <Menu.Item
                style={styles.menuItemStyle}
                icon={<LogoutOutlined />}
                danger
                onClick={onLogOut}>
                Sing out
              </Menu.Item>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Sider>
  )
}

export default Navigation
