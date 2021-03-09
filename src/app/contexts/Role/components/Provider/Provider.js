import { useState } from 'react'
import { useSession } from 'contexts/Session/hooks'
import roleContext from 'contexts/Role/context'
import { ROLES } from '~/constants'

/**
 * @info RoleProvider (08 Mar 2021) // CREATION DATE
 *
 * @comment
 * 	RoleProvider - React context provider component.
 * 	Use to role in application to use different views & behavior.
 *
 * @since 08 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const ACCESS = {
  [ROLES.ADMIN]: [ROLES.ADMIN, ROLES.MENTOR, ROLES.STUDENT],
  [ROLES.MENTOR]: [ROLES.MENTOR, ROLES.STUDENT],
  [ROLES.STUDENT]: [ROLES.STUDENT]
}

const RoleProvider = (props) => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()

  // [COMPONENT_STATE_HOOKS]
  const [currentRole, setCurrentRole] = useState(session.role)

  // [TEMPLATE]
  return (
    <roleContext.Provider
      value={{
        accessRoles: ACCESS[session.role],
        role: currentRole,
        setRole: setCurrentRole
      }}
      {...props}
    />
  )
}

export default RoleProvider
