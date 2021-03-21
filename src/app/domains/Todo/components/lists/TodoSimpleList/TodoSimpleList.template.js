import PropTypes from 'prop-types'
import { List, Typography, Input, Form, Col } from 'antd'
import { Remove, Edit, Box, Row } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useState, useRef, useEffect } from 'react'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

const { Text } = Typography

/**
 * @info TodoSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleList - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoSimpleList = (props) => {
  // [INTERFACES]
  const { setTodos, todos, onDeleteTodo } = props

  // [ADDITIONAL_HOOKS]
  const inputRef = useRef(null)
  const [form] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  const [editTodo, setEditTodo] = useState(false)
  const [editLoading, setEditLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = async (data, id) => {
    setEditLoading(true)
    const editTodoIndex = todos.findIndex((todo) => todo.id === id)
    const newTodos = [...todos]
    newTodos[editTodoIndex] = { name: data.todo || editTodo.name, id }

    try {
      await firestore
        .collection(COLLECTIONS.TODOS)
        .doc(id)
        .update({ name: data.todo })
    } catch (error) {
      console.log('todo submit', error)
    }
    setTodos(newTodos)
    setEditTodo(false)
    setEditLoading(false)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    editTodo &&
      inputRef.current.focus({
        cursor: 'end'
      })
  }, [editTodo])

  // [TEMPLATE]
  return (
    <List
      size="large"
      dataSource={todos}
      renderItem={(todo) => (
        <Box width="100%">
          <List.Item
            actions={[
              <Edit
                shape="default"
                tooltip="Edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => setEditTodo(todo)}
              />,
              <Remove
                shape="default"
                tooltip="Remove"
                type="text"
                onClick={() => setEditTodo(false)}
                icon={<DeleteOutlined />}
                onSubmit={() => onDeleteTodo(todo.id)}
              />
            ]}>
            {editTodo.id === todo.id ? (
              <Row flex={1}>
                <Col span={24}>
                  <Form
                    form={form}
                    onFinish={(value) => onSubmit(value, todo.id)}>
                    <Form.Item
                      style={{ flex: 1 }}
                      name="todo"
                      noStyle
                      hasFeedback={editLoading}
                      validateStatus="validating">
                      <Input.TextArea
                        disabled={editLoading}
                        onPressEnter={(e) => {
                          e.preventDefault()
                          form.submit()
                        }}
                        autoSize={{ minRows: 1 }}
                        ref={inputRef}
                        defaultValue={editTodo.name}
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            ) : (
              <Text ellipsis>{todo.name}</Text>
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
