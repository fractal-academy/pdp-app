import PropTypes from 'prop-types'
import { List, Typography, Input, Form } from 'antd'
import { Remove, Edit, Box } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Text } = Typography
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
  const { setTodos, todos, onDeleteTodo } = props

  // [COMPONENT_STATE_HOOKS]
  const [editTodo, setEditTodo] = useState(false)

  // [HELPER_FUNCTIONS]
  const onEdit = (todo, idx) => {
    setEditTodo({ todo, idx })
  }

  const onSubmit = (value, idx) => {
    const newTodos = [...todos]
    newTodos[idx] = value.todo
    setTodos(newTodos)
    setEditTodo(false)
  }

  // [TEMPLATE]
  return (
    <List
      size="large"
      dataSource={todos}
      renderItem={(todo, idx) => (
        <Box width="100%">
          <List.Item
            actions={[
              <Edit
                icon={<EditOutlined />}
                onClick={() => onEdit(todo, idx)}
              />,
              <Remove
                onClick={() => setEditTodo(false)}
                icon={<DeleteOutlined />}
                onSubmit={() => onDeleteTodo(idx)}
              />
            ]}>
            {editTodo.idx === idx ? (
              <Form
                style={{ width: '100%' }}
                onFinish={(todo) => onSubmit(todo, idx)}
                layout="inline">
                <Form.Item style={{ flex: 1 }} name="todo">
                  <Input defaultValue={editTodo.todo} />
                </Form.Item>
              </Form>
            ) : (
              <Text>{todo}</Text>
            )}
          </List.Item>
        </Box>
      )}
    />
  )
}

// [PROPTYPES]
TodoSimpleList.propTypes = {
  todos: PropTypes.array,
  setTodos: PropTypes.func,
  onDeleteTodo: PropTypes.func
}

export default TodoSimpleList
