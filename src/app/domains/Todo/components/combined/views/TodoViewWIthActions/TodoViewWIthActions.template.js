import PropTypes from 'prop-types'
import { Checkbox } from 'antd'

/**
 * @info TodoViewWIthActions (15 Mar 2021) // CREATION DATE
 *
 * @comment TodoViewWIthActions - React component.
 *
 * @since 15 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const TodoViewWIthActions = (props) => {
  // [INTERFACES]
  const { technology } = props
  const options = []
  const defaultValue = []

  // [HELPER_FUNCTIONS]
  const getOptions = () =>
    Object.keys(technology.todoIds).forEach((todoId) => {
      options.push({
        label: technology.todoIds[todoId].name,
        value: technology.todoIds[todoId].id
      })
      technology.todoIds[todoId].isDone &&
        defaultValue.push(technology.todoIds[todoId].id)
    })
  getOptions()

  // [TEMPLATE]
  return (
    <Checkbox.Group
      options={options && options}
      defaultValue={defaultValue && defaultValue}
    />
  )
}

// [PROPTYPES]
TodoViewWIthActions.propTypes = {
  planId: PropTypes.string.isRequired,
  technologyId: PropTypes.string.isRequired
}

export default TodoViewWIthActions
