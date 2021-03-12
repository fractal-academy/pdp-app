import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TodoSimpleForm } from 'domains/Todo/components/forms'
import { TodoSimpleList } from 'domains/Todo/components/lists'
import { PageWrapper } from '~/components/HOC'
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
  const onNext = () => {
    history.push(ROUTE_PATHS.MATERIAL_CREATE)
  }
  const onBack = () => {
    history.goBack()
  }
  // -----------------------------

  // [TEMPLATE]
  return (
    <PageWrapper title="Create ToDo" onNext={onNext} onBack={onBack}>
      <TodoSimpleForm onSubmit={onSubmit} editTodo={editTodo} />
      <TodoSimpleList
        setTodos={setTodos}
        todos={todos}
        onDeleteTodo={onDeleteTodo}
      />
    </PageWrapper>
  )
}

// [PROPTYPES]
TodoCreate.propTypes = {}

export default TodoCreate
