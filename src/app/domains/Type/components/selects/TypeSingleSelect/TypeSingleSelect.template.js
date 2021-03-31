import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Select } from 'antd'
import { TYPES, TYPES_VALUES } from '~/constants'

/**
 * @info TypeSingleSelect (15 Mar 2021) // CREATION DATE
 *
 * @comment TypeSingleSelect - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TypeSingleSelect = (props) => {
  // [INTERFACES]
  const { type, ...rest } = props

  // [USE_EFFECTS]
  useEffect(() => {
    rest.onChange?.(type || rest.value || TYPES.HARD)
  }, [])

  // [TEMPLATE]
  return (
    <Select defaultValue={type || rest.value || TYPES.HARD} {...rest}>
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
