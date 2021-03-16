import PropTypes from 'prop-types'
import { Select } from 'antd'
import { TYPES, TYPES_VALUES } from '~/constants'

/**
 * @info TypeSingleSelect (15 Mar 2021) // CREATION DATE
 *
 * @comment TypeSingleSelect - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TypeSingleSelect = (props) => {
  // [INTERFACES]
  const { type, ...rest } = props

  // [TEMPLATE]
  return (
    <Select defaultValue={TYPES.HARD} {...rest}>
      {TYPES_VALUES.map((skill) => (
        <Select.Option value={skill}>{skill}</Select.Option>
      ))}
    </Select>
  )
}

// [PROPTYPES]
TypeSingleSelect.propTypes = {
  type: PropTypes.string,
  rest: PropTypes.object
}

export default TypeSingleSelect
