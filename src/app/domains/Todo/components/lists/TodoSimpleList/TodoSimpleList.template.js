import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { List, Input, Form, Col, Tag } from 'antd'
import { Remove, Edit, Box, Row } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { updateDocument } from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info TodoSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleList - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoSimpleList = (props) => {
  // [INTERFACES]
  const { setTodos, todos, onDeleteTodo } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const [form] = Form.useForm()

  const historyState = history.location.state

  // [COMPONENT_STATE_HOOKS]
  const inputRef = useRef(null)
  const [editTodo, setEditTodo] = useState(false)
  const [editLoading, setEditLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = async (data, id) => {
    setEditLoading(true)
    const editTodoIndex = todos.findIndex((todo) => todo.id === id)
    const newTodos = [...todos]
    newTodos[editTodoIndex] = { name: data.todo || editTodo.name, id }

    try {
      let collectionPath = COLLECTIONS.TODOS
      if (historyState.planId) {
        collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}/${COLLECTIONS.TODOS}`
      }
      await updateDocument(collectionPath, id, { name: data.todo })
    } catch (error) {
      console.log('todo submit', error)
    }
    setTodos(newTodos)
    setEditTodo(false)
    setEditLoading(false)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    if (editTodo) {
      inputRef.current.focus({
        cursor: 'end'
      })
    }
  }, [editTodo])

  // [TEMPLATE]
  return (
    <List
      size="large"
      dataSource={todos}
      renderItem={(todo) => (
        <Box width="100%">
          <List.Item
            actions={
              !todo.readOnly && [
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
              ]
            }>
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
                      initialValue={editTodo.name}
                      preserve={false}
                      validateStatus="validating">
                      <Input.TextArea
                        disabled={editLoading}
                        onPressEnter={() => form.submit()}
                        autoSize={{ minRows: 1 }}
                        ref={inputRef}
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            ) : (
              <>
                <List.Item.Meta title={todo.name} />
                {todo.readOnly && <Tag color="warning">From Template</Tag>}
              </>
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
