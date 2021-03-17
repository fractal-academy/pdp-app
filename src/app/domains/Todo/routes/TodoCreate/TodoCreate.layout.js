import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TodoSimpleForm } from 'domains/Todo/components/forms'
import { TodoSimpleList } from 'domains/Todo/components/lists'
import { PageWrapper } from '~/components/HOC'
import _ from 'lodash'

/**
 * @info TodoCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoCreate - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state
  const currentLevels = historyState.selectedLevel
  let currentLevelTodos = []

  // Check if there are already exist todos for currentLevels
  if (historyState?.todoTemplates) {
    currentLevelTodos =
      historyState.todoTemplates[currentLevels.levelId][
        currentLevels.subLevelId
      ]
  }

  // [COMPONENT_STATE_HOOKS]
  const [todos, setTodos] = useState(currentLevelTodos || [])
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
    if (todos.length) {
      const { levelId, subLevelId } = historyState.selectedLevel

      let currentLevelTodos = { [subLevelId]: todos }
      if (historyState?.todoTemplates) {
        currentLevelTodos = {
          ...historyState?.todoTemplates[levelId],
          [subLevelId]: todos
        }
      }

      return history.push(historyState.prevLocation, {
        ...historyState,
        todoTemplates: {
          ...historyState?.todoTemplates,
          [levelId]: currentLevelTodos
        }
      })
    }
    history.push(historyState.prevLocation, historyState)
  }
  const onBack = () => {
    history.push(historyState.prevLocation, historyState)
  }
  // -----------------------------

  // [TEMPLATE]
  return (
    <PageWrapper
      title="Create ToDo"
      nextBtnProps={{ text: 'Apply' }}
      onNext={onNext}
      onBack={onBack}>
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
