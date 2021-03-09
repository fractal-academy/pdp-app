import { useState, useEffect } from 'react'
import { Box, Sider } from 'antd-styled'
import { Divider, Menu } from 'antd'
import { useHistory, generatePath } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { UserAdvancedView } from 'domains/User/components/views'
import { ROLES } from '~/constants'
import * as ROUTE_PATHS from 'app/constants/routePaths'
import { ROUTE_PATHS as CHAT_ROUTE_PATHS } from 'chat-module/constants'
import { useSession } from 'contexts/Session/hooks'
import { useRole } from 'contexts/Role/hooks'
import * as styles from './Navigation.style'

/**
 * @info Navigation (05 Mar 2021) // CREATION DATE
 *
 * @comment Navigation - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MENU_ITEMS = {
  [ROLES.ADMIN]: {
    USER: {
      title: 'Users',
      route: ROUTE_PATHS.START_PAGE_MAP[ROLES.ADMIN]
    },
    COMPETENCES: {
      title: 'Competences',
      route: ROUTE_PATHS.COMPETENCES_ALL
    },
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
    CHATS: {
      title: 'Chats',
      route: generatePath(CHAT_ROUTE_PATHS.CHATS_ALL, { role: ROLES.MENTOR })
    }
  },
  [ROLES.STUDENT]: {
    MY_PLANS: {
      title: 'My Plans',
      route: ROUTE_PATHS.START_PAGE_MAP[ROLES.STUDENT]
    },
    CHATS: {
      title: 'Chats',
      route: generatePath(CHAT_ROUTE_PATHS.CHATS_ALL, { role: ROLES.STUDENT })
    }
  }
}

const MOCK_USER = {
  firstName: 'Fractal',
  secondName: 'Band',
  email: 'fractal@gmail.com',
  avatarURL:
    'https://firebasestorage.googleapis.com/v0/b/expenses-senseteq.appspot.com/o/photo_2020-11-27_19-32-45.jpg?alt=media&token=75958d4d-46ab-458f-b413-e81696c8c16d'
}

const Navigation = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const session = useSession()
  const { role } = useRole()

  // [COMPONENT_STATE_HOOKS]
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    history.location.pathname || ROUTE_PATHS.START_PAGE_MAP[role]
  )

  // [HELPER_FUNCTIONS]
  const goToProfile = () =>
    history.push(generatePath(ROUTE_PATHS.USER_SHOW, { id: session.id }))

  // [COMPUTED_PROPERTIES]
  const roleMenu = Object.values(MENU_ITEMS[role])

  // [USE_EFFECTS]
  useEffect(
    () =>
      setSelectedMenuItem(
        history.location.pathname || ROUTE_PATHS.START_PAGE_MAP[role]
      ),
    [role, history]
  )

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
            {...MOCK_USER}
            onAvatarClick={goToProfile}
            role={role}
            withRoleSelect={(value) => {
              history.push(ROUTE_PATHS.START_PAGE_MAP[value])
            }}
            avatarLeft
          />
        </Box>
        <Box paddingX={4}>
          <Divider>Menu</Divider>
        </Box>
        <Menu
          selectedKeys={[selectedMenuItem]}
          style={styles.menuStyle}
          onClick={({ key }) => setSelectedMenuItem(key)}>
          {roleMenu.map((menuItem) => (
            <styles.MenuItem
              key={menuItem.route}
              onClick={() => history.push(menuItem.route)}>
              {menuItem.title}
            </styles.MenuItem>
          ))}
        </Menu>

        <Box display="flex" flex={1}>
          <Box alignSelf="flex-end" width="100%">
            <Menu style={styles.menuStyle} selectable={false}>
              <Menu.Item
                style={styles.menuItemStyle}
                icon={<LogoutOutlined />}
                danger>
                Log out
              </Menu.Item>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Sider>
  )
}

// [PROPTYPES]
Navigation.propTypes = {}

export default Navigation
