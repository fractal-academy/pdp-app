import PropTypes from 'prop-types'
import { Select } from 'antd'
import { useRole } from 'contexts/Role/hooks'

/**
 * @info RoleSingleSelect (05 Mar 2021) // CREATION DATE
 *
 * @comment RoleSingleSelect - React component.
 *
 * @since 24 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const RoleSingleSelect = (props) => {
  // [INTERFACES]
  const { role, onRoleSelect, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const { accessRoles } = useRole()

  // [TEMPLATE]
  return (
    <Select
      value={role}
      onChange={onRoleSelect}
      size="small"
      bordered={false}
      {...rest}>
      {accessRoles.map((role) => (
        <Select.Option value={role} key={role}>
          {role}
        </Select.Option>
      ))}
    </Select>
  )
}

// [PROPTYPES]
RoleSingleSelect.propTypes = {
  role: PropTypes.string.isRequired,
  onRoleSelect: PropTypes.func
}

export default RoleSingleSelect
