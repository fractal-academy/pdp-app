import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { Content } from 'antd-styled'
import { useRole } from 'contexts/Role/hooks'
import { AccessDenied, NotFoundPath } from '~/components'

/**
 * @info withProtect (08 Mar 2021) // CREATION DATE
 *
 * @comment withProtect - React HOC component using to protect routes.
 *
 * @since 31 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
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

  // [COMPUTED_PROPERTIES]
  const targetRole = _.intersection(roles, accessRoles)[0]

  // [USE_EFFECTS]
  useEffect(() => {
    if (targetRole && role !== targetRole) {
      setRole(targetRole)
    }
  }, [accessRoles, roles, setRole])

  // [LOGIC]
  if (
    !roles?.includes(targetRole) ||
    (params?.role && !params.role?.includes(role))
  ) {
    if (params?.role && accessRoles.includes(params.role)) {
      setRole(params.role)
      return <Component {...props} />
    }
    if (params.role && !accessRoles.some((role) => role === params.role)) {
      return <NotFoundPath />
    }
    return (
      <Content bg="#ffffff" paddingTop={4} paddingX={4}>
        <AccessDenied />
      </Content>
    )
  }

  return <Component {...props} />
}

withProtect.propType = {
  protectConfig: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string)
  })
}

export default withProtect
