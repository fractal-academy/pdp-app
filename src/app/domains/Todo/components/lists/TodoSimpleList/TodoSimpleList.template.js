import PropTypes from 'prop-types'
import { List, Typography, Input, Form, Col } from 'antd'
import { Remove, Edit, Box, Row } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useState, useRef, useEffect } from 'react'
const { Text } = Typography

/**
 * @info TodoSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleList - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
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

  // [HELPER_FUNCTIONS]
  const onEdit = (todo, idx) => {
    setEditTodo({ todo, idx })
  }

  const onSubmit = (value, idx) => {
    const newTodos = [...todos]
    newTodos[idx] = value.todo || editTodo.todo
    setTodos(newTodos)
    setEditTodo(false)
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
      renderItem={(todo, idx) => (
        <Box width="100%">
          <List.Item
            actions={[
              <Edit
                shape="default"
                tooltip="Edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit(todo, idx)}
              />,
              <Remove
                shape="default"
                tooltip="Remove"
                type="text"
                onClick={() => setEditTodo(false)}
                icon={<DeleteOutlined />}
                onSubmit={() => onDeleteTodo(idx)}
              />
            ]}>
            {editTodo.idx === idx ? (
              <Row flex={1}>
                <Col span={24}>
                  <Form form={form} onFinish={(todo) => onSubmit(todo, idx)}>
                    <Form.Item style={{ flex: 1 }} name="todo" noStyle>
                      <Input.TextArea
                        onPressEnter={(e) => {
                          e.preventDefault()
                          form.submit()
                        }}
                        autoSize={{ minRows: 1 }}
                        ref={inputRef}
                        defaultValue={editTodo.todo}
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            ) : (
              <Text ellipsis>{todo}</Text>
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
