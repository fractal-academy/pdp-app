import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { PageWrapper } from '~/components/HOC'
import { TodoSimpleForm } from 'domains/Todo/components/forms'
import { TodoSimpleList } from 'domains/Todo/components/lists'
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
 * @since 30 Mar 2021 ( v.0.1.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state
  const currentLevels = historyState.selectedLevel
  let currentLevelTodos

  // [TECHNOLOGY CREATION WIZARD]
  // Check if there are already exist todos for currentLevels
  if (historyState?.todoIds) {
    currentLevelTodos =
      historyState.todoIds?.[currentLevels.levelId]?.[currentLevels.subLevelId]
  }

  // [PLAN CREATION WIZARD]
  if (historyState.planId) {
    const currentTech = historyState.selectedTech.find(
      ({ key }) => key === historyState.technologyId
    )
    currentLevelTodos =
      currentTech.todoIds?.[currentLevels.levelId]?.[currentLevels.subLevelId]
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
        let collectionPath = COLLECTIONS.TODOS
        if (historyState.planId) {
          collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}/${COLLECTIONS.TODOS}`
        }
        const todoId = getDocumentRef(collectionPath).id

        const todoData = {
          id: todoId,
          name: value,
          technologyId: historyState.technologyId,
          levelId: currentLevels,
          createdAt: getTimestamp().now(),
          readOnly: true
        }

        await setDocument(collectionPath, todoData.id, todoData)
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
      let collectionPath = COLLECTIONS.TODOS
      if (historyState.planId) {
        collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}/${COLLECTIONS.TODOS}`
      }
      await deleteDocument(collectionPath, todoId)
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
      let data = {
        ...historyState,
        todoIds: {
          ...historyState?.todoIds,
          [levelId]: currentLevelTodos
        }
      }
      if (historyState.selectedTech) {
        const techIndex = historyState.selectedTech.findIndex(
          ({ key }) => key === historyState.technologyId
        )
        historyState.selectedTech[techIndex].todoIds = {
          ...historyState?.todoIds,
          [levelId]: currentLevelTodos
        }
        data = historyState
      }
      return history.replace(historyState.prevLocation, data)
    }
    // If there are no todos delete empty object from history state
    if (historyState?.todoIds) {
      delete historyState?.todoIds[levelId][subLevelId]
      // Check if there was last item is this level delete level object
      if (!Object.values(historyState?.todoIds[levelId]).length) {
        delete historyState?.todoIds[levelId]
      }
    }
    history.replace(historyState.prevLocation, historyState)
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
        todos={_.sortBy(todos, 'createdAt')}
        onDeleteTodo={onDeleteTodo}
      />
    </PageWrapper>
  )
}

export default TodoCreate
