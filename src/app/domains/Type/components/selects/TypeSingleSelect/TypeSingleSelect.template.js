import PropTypes from 'prop-types'
import { Select } from 'antd'
import { TYPES, TYPES_VALUES } from '~/constants'

/**
 * @info TypeSingleSelect (15 Mar 2021) // CREATION DATE
 *
 * @comment TypeSingleSelect - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TypeSingleSelect = (props) => {
  // [INTERFACES]
  const { type, ...rest } = props

  // [TEMPLATE]
  return (
    <Select defaultValue={type || TYPES.HARD} {...rest}>
      {TYPES_VALUES.map((skill) => (
        <Select.Option value={skill} key={skill}>
          {skill}
        </Select.Option>
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
