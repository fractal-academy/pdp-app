import PropTypes from 'prop-types'
import { useRole } from 'contexts/Role/hooks'
import { AccessDenied } from '~/components'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

/**
 * @info withProtect (08 Mar 2021) // CREATION DATE
 *
 * @comment withProtect - React HOC component using to protect routes.
 *
 * @since 09 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @param {string[]} protectConfig.roles - array of roles that have access to this route
 *
 * @return {ReactComponent}
 */

const withProtect = (protectConfig) => (Component) => (props) => {
  // [INTERFACES]
  const { roles } = protectConfig

  // [ADDITIONAL_HOOKS]
  const params = useParams()
  const { role, setRole, accessRoles } = useRole()

  // [LOGIC]
  if (
    !roles?.includes(_.intersection(roles, accessRoles)[0]) ||
    (params?.role && !params.role?.includes(role))
  ) {
    if (params?.role && accessRoles.includes(params.role)) {
      setRole(params.role)
      return <Component {...props} />
    }
    return <AccessDenied />
  }
  return <Component {...props} />
}

withProtect.propType = {
  protectConfig: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string)
  })
}

export default withProtect
