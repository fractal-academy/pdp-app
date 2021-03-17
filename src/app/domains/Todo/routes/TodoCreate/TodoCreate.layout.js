import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TodoSimpleForm } from 'domains/Todo/components/forms'
import { TodoSimpleList } from 'domains/Todo/components/lists'
import { PageWrapper } from '~/components/HOC'
import _ from 'lodash'
import firestore from '~/services/Firebase/firestore'
import firebase from 'firebase'
import { COLLECTIONS } from 'app/constants'

/**
 * @info TodoCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoCreate - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
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
  if (historyState?.todoTemplates) {
    currentLevelTodos =
      historyState.todoTemplates?.[currentLevels.levelId]?.[
        currentLevels.subLevelId
      ]
  }

  // [COMPONENT_STATE_HOOKS]
  const [todos, setTodos] = useState([])
  const [todoAddLoading, setTodoAddLoading] = useState(false)
  const [editTodo, setEditTodo] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = async (value) => {
    if (value) {
      setTodoAddLoading(true)

      try {
        const collectionRef = firestore.collection(COLLECTIONS.TODO_TEMPLATES)

        const todoRef = await collectionRef.add({})

        const todoData = {
          id: todoRef.id,
          name: value,
          technologyId: historyState.technologyId,
          levelId: currentLevels.subLevelId,
          createAt: firebase.firestore.Timestamp.now()
        }

        await collectionRef.doc(todoData.id).set(todoData)
        setTodos([...todos, { name: todoData.name, id: todoData.id }])
      } catch (e) {
        console.log(e)
      }
      setEditTodo('')
      setTodoAddLoading(false)
    }
  }

  const onDeleteTodo = async (todoId) => {
    const newTodos = _.filter(todos, (item) => item.id !== todoId)
    try {
      await firestore
        .collection(COLLECTIONS.TODO_TEMPLATES)
        .doc(todoId)
        .delete()
    } catch (error) {
      console.log('todo delete', error)
    }
    setTodos(newTodos)
  }

  // -- Header step button functions --
  const onSave = () => {
    const { levelId, subLevelId } = historyState.selectedLevel
    if (todos.length) {
      const todoIds = todos.map((todo) => todo.id)
      let currentLevelTodos = { [subLevelId]: todoIds }

      if (historyState?.todoTemplates) {
        currentLevelTodos = {
          ...historyState?.todoTemplates[levelId],
          [subLevelId]: todoIds
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
    // If there are no todos delete empty object from history state
    if (historyState?.todoTemplates) {
      delete historyState?.todoTemplates[levelId][subLevelId]
      // Check if there was last item is this level delete level object
      if (!Object.values(historyState?.todoTemplates[levelId]).length) {
        delete historyState?.todoTemplates[levelId]
      }
    }
    history.push(historyState.prevLocation, historyState)
  }
  // ----------------------------------

  // [USE_EFFECTS]
  useEffect(() => {
    // todo need loading
    // refactor to custom hook
    const fetchTodos = async () => {
      try {
        const todosSnapshot = await firestore
          .collection(COLLECTIONS.TODO_TEMPLATES)
          .where('id', 'in', currentLevelTodos)
          .get()
        const todosData = todosSnapshot.docs.map((item) => item.data())

        const todos = _.sortBy(todosData, ({ createAt }) =>
          createAt.toDate()
        ).map((item) => ({
          name: item.name,
          id: item.id
        }))

        setTodos(todos)
      } catch (e) {
        console.log(e)
      }
    }
    currentLevelTodos?.length && fetchTodos()
  }, [currentLevelTodos])

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
