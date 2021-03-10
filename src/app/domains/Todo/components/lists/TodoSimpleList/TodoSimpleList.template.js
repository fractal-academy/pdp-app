import PropTypes from 'prop-types'
import { List } from 'antd'
import { Remove, Edit } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
/**
 * @info TodoSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleList - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoSimpleList = (props) => {
  // [INTERFACES]
  const { todos, onEditTodo, onDeleteTodo } = props

  // [TEMPLATE]
  return (
    <List
      size="large"
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item
          actions={[
            <Edit icon={<EditOutlined />} onClick={() => onEditTodo(todo)} />,
            <Remove
              icon={<DeleteOutlined />}
              onSubmit={() => onDeleteTodo(todo.id)}
            />
          ]}>
          <div>{todo.name}</div>
        </List.Item>
      )}
    />
  )
}

// [PROPTYPES]
TodoSimpleList.propTypes = {
  todos: PropTypes.array,
  onEditTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func
}

export default TodoSimpleList
