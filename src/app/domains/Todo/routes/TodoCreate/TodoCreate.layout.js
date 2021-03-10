import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { Row, Col, Back, HeadingPrimary } from 'antd-styled'
import { TodoSimpleForm } from 'domains/Todo/components/forms'
import { TodoSimpleList } from 'domains/Todo/components/lists'
import _ from 'lodash'
import { ROUTE_PATHS } from 'app/constants'

/**
 * @info TodoCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoCreate - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = (value) => {
    value && setTodos([...todos, value])
    setEditTodo('')
  }

  const onDeleteTodo = (idx) => {
    const newTodos = _.remove(todos, (item, index) => {
      return index !== idx
    })
    setTodos(newTodos)
  }

  // -- Header step button functions --
  const onClickNext = () => {
    history.push(ROUTE_PATHS.MATERIAL_CREATE)
  }
  const onClickBack = () => {
    history.goBack()
  }
  // -----------------------------

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Row gutter={[8]} mb={3} justify="space-between">
          <Col>
            <Back onClick={onClickBack} size="large">
              Back
            </Back>
          </Col>
          <Col>
            <Button onClick={onClickNext} size="large" type="primary">
              Next
            </Button>
          </Col>
        </Row>
        <HeadingPrimary title="Create ToDo" />
        <Row gutter={[8, 16]} justify="center">
          <Col span={16}>
            <TodoSimpleForm onSubmit={onSubmit} editTodo={editTodo} />
          </Col>
          <Col span={16}>
            <TodoSimpleList
              setTodos={setTodos}
              todos={todos}
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
