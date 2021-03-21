import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TodoSimpleForm } from 'domains/Todo/components/forms'
import { TodoSimpleList } from 'domains/Todo/components/lists'
import { PageWrapper } from '~/components/HOC'
import _ from 'lodash'
import {
  deleteDocument,
  getDocumentRef,
  getTimestamp,
  setDocument
} from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info TodoCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoCreate - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.9 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state
  const currentLevels = historyState.selectedLevel
  let currentLevelTodos

  // Check if there are already exist todos for currentLevels
  if (historyState?.todoIds) {
    currentLevelTodos =
      historyState.todoIds?.[currentLevels.levelId]?.[currentLevels.subLevelId]
  }

  // [COMPONENT_STATE_HOOKS]
  const [todos, setTodos] = useState(currentLevelTodos || [])
  const [todoAddLoading, setTodoAddLoading] = useState(false)
  const [editTodo, setEditTodo] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = async (value) => {
    if (value) {
      setTodoAddLoading(true)

      try {
        const todoId = getDocumentRef(COLLECTIONS.TODOS).id

        const todoData = {
          id: todoId,
          name: value,
          technologyId: historyState.technologyId,
          levelId: currentLevels,
          createdAt: getTimestamp().now(),
          readOnly: true
        }

        await setDocument(COLLECTIONS.TODOS, todoData.id, todoData)
        setTodos([...todos, { name: todoData.name, id: todoData.id }])
      } catch (error) {
        console.log('todo create', error)
      }
      setEditTodo('')
      setTodoAddLoading(false)
    }
  }

  const onDeleteTodo = async (todoId) => {
    const newTodos = _.filter(todos, (item) => item.id !== todoId)
    try {
      await deleteDocument(COLLECTIONS.TODOS, todoId)
    } catch (error) {
      console.log('todo delete', error)
    }
    setTodos(newTodos)
  }

  // -- Header step button functions --
  const onSave = () => {
    const { levelId, subLevelId } = historyState.selectedLevel
    if (todos.length) {
      let currentLevelTodos = { [subLevelId]: todos }

      if (historyState?.todoIds) {
        currentLevelTodos = {
          ...historyState?.todoIds[levelId],
          [subLevelId]: todos
        }
      }

      return history.push(historyState.prevLocation, {
        ...historyState,
        todoIds: {
          ...historyState?.todoIds,
          [levelId]: currentLevelTodos
        }
      })
    }
    // If there are no todos delete empty object from history state
    if (historyState?.todoIds) {
      delete historyState?.todoIds[levelId][subLevelId]
      // Check if there was last item is this level delete level object
      if (!Object.values(historyState?.todoIds[levelId]).length) {
        delete historyState?.todoIds[levelId]
      }
    }
    history.push(historyState.prevLocation, historyState)
  }
  // ----------------------------------

  // [TEMPLATE]
  return (
    <PageWrapper
      title="Create ToDo"
      nextBtnProps={{ text: 'Save' }}
      onNext={onSave}
      onBack={onSave}>
      <TodoSimpleForm
        onSubmit={onSubmit}
        editTodo={editTodo}
        loading={todoAddLoading}
      />
      <TodoSimpleList
        setTodos={setTodos}
        todos={todos}
        onDeleteTodo={onDeleteTodo}
      />
    </PageWrapper>
  )
}

export default TodoCreate
