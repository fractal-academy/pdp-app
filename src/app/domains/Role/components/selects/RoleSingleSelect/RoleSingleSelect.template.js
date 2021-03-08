import PropTypes from 'prop-types'
import { Select } from 'antd'
import { useRole } from 'contexts/Role/hooks'
import { ROLES_VALUES } from '~/constants'

/**
 * @info RoleSingleSelect (05 Mar 2021) // CREATION DATE
 *
 * @comment RoleSingleSelect - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const RoleSingleSelect = (props) => {
  // [INTERFACES]
  const { role, onRoleSelect } = props

  // [ADDITIONAL_HOOKS]
  const { setRole } = useRole()

  // [HELPER_FUNCTIONS]
  const handleRoleSelect = (value) => {
    setRole(value)
    onRoleSelect(value)
  }

  // [TEMPLATE]
  return (
    <Select
      defaultValue={role}
      onChange={handleRoleSelect}
      size="small"
      bordered={false}>
      {ROLES_VALUES.map((role) => (
        <Select.Option value={role}>{role}</Select.Option>
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
