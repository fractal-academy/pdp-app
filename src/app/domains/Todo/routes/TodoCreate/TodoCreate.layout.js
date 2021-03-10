import PropTypes from 'prop-types'
import { Button } from 'antd'
import { Row, Col, Back, HeadingPrimary } from 'antd-styled'
import { TodoSimpleForm } from 'domains/Todo/components/forms'
import { TodoSimpleList } from 'domains/Todo/components/lists'
import { useState, useRef } from 'react'
import { uid } from 'uid'
import _ from 'lodash'

/**
 * @info TodoCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoCreate - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoCreate = (props) => {
  // [COMPONENT_STATE_HOOKS]
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState()
  const inputRef = useRef()

  // [HELPER_FUNCTIONS]
  const onSubmit = (value) => {
    let newTodos = []
    if (editTodo) {
      newTodos = _.remove(todos, (item) => {
        return item.id !== editTodo.id
      })
      setTodos([...newTodos, { id: editTodo.id, name: value }])
      setEditTodo('')
    } else {
      const id = uid()
      setTodos([...todos, { id, name: value }])
    }
  }

  const onDeleteTodo = (id) => {
    const newTodos = _.remove(todos, (item) => {
      return item.id !== id
    })
    setTodos(newTodos)
  }
  const onEditTodo = (todo) => {
    setEditTodo(todo)
    inputRef.current.value = todo.name
  }

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Row gutter={[8]} mb={3} justify="space-between">
          <Col>
            <Back size="large">Back</Back>
          </Col>
          <Col>
            <Button size="large" type="primary">
              Next
            </Button>
          </Col>
        </Row>
        <HeadingPrimary title="Create ToDo" />
        <Row gutter={[8, 16]} justify="center">
          <Col span={16}>
            <TodoSimpleForm
              onSubmit={onSubmit}
              editTodo={editTodo}
              ref={inputRef}
            />
          </Col>
          <Col span={16}>
            <TodoSimpleList
              todos={todos}
              onEditTodo={onEditTodo}
              onDeleteTodo={onDeleteTodo}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

// [PROPTYPES]
TodoCreate.propTypes = {}

export default TodoCreate
