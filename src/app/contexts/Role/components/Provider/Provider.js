import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSession } from 'contexts/Session/hooks'
import roleContext from 'contexts/Role/context'
import { ROUTE_PATHS } from 'app/constants'

/**
 * @info RoleProvider (08 Mar 2021) // CREATION DATE
 *
 * @comment
 * 	RoleProvider - React context provider component.
 * 	Use to role in application to use different views & behavior.
 *
 * @since 08 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const RoleProvider = (props) => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]
  const [currentRole, setCurrentRole] = useState()

  // [USE_EFFECTS]
  useEffect(() => setCurrentRole(session.role), [session.role])
  useEffect(() => history.push(ROUTE_PATHS.START_PAGE_MAP[session.role]), [
    session.role,
    history
  ])
  // [TEMPLATE]
  return (
    <roleContext.Provider
      value={{ role: currentRole, setRole: setCurrentRole }}
      {...props}
    />
  )
}

export default RoleProvider
