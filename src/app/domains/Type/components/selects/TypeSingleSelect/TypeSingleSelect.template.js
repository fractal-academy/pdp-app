import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Select } from 'antd'
import { TYPES_VALUES } from '~/constants'

/**
 * @info TypeSingleSelect (15 Mar 2021) // CREATION DATE
 *
 * @comment TypeSingleSelect - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.8 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TypeSingleSelect = (props) => {
  // [INTERFACES]
  const { type, ...rest } = props

  // [USE_EFFECTS]
  useEffect(() => {
    rest.onChange?.(type || rest.value)
  }, [])

  // [TEMPLATE]
  return (
    <Select
      style={{ textTransform: (type || rest.value) && 'capitalize' }}
      defaultValue={type || rest.value}
      {...rest}>
      {TYPES_VALUES.map((skill) => (
        <Select.Option
          style={{ textTransform: 'capitalize' }}
          value={skill}
          key={skill}>
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
