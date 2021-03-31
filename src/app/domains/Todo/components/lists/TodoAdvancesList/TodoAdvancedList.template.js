import PropTypes from 'prop-types'
import { useState } from 'react'
import { Input } from 'antd'
import { Title, Box } from 'antd-styled'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Spinner } from '~/components'
import { TodoViewWIthActions } from 'domains/Todo/components/combined/views'
import firestore from '~/services/Firebase/firestore/index'
import {
  getCollectionRef,
  getDocumentRef,
  setDocument,
  updateDocument
} from '~/services/Firebase/firestore/index'
import { COLLECTIONS } from 'app/constants'

/**
 * @info TodoAdvancedList (14 Mar 2021) // CREATION DATE
 *
 * @comment TodoAdvancedList - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.8 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoAdvancedList = (props) => {
  // [INTERFACES]
  const { plan, activePlanId } = props

  // [ADDITIONAL_HOOKS]
  const [technologies, loading] = useCollectionData(
    getCollectionRef(
      `${COLLECTIONS.PLANS}/${plan.id}/${COLLECTIONS.TECHNOLOGIES}`
    )
  )

  // [TEMPLATE]
  return (
    <>
      <Title level={3} style={{ color: 'white' }}>
        {plan.name}
      </Title>
      {loading ? (
        <Spinner />
      ) : (
        technologies?.map(
          (technology) =>
            technology?.todoIds && (
              <TodoListMapItem
                technology={technology}
                plan={plan}
                activePlanId={activePlanId}
              />
            )
        )
      )}
    </>
  )
}

const TodoListMapItem = (props) => {
  const { technology, plan, activePlanId } = props
  // [COMPONENT_STATE_HOOKS]
  const [newTodo, setNewTodo] = useState('')

  // [HELPER_FUNCTIONS]
  const addTodo = async (value, technology) => {
    const collectionPath = `${COLLECTIONS.PLANS}/${plan.id}`

    const todoId = getDocumentRef(COLLECTIONS.TODOS).id
    const todoData = {
      name: value.target.value,
      id: todoId,
      readOnly: false,
      isDone: false
    }
    try {
      await setDocument(
        `${collectionPath}/${COLLECTIONS.TODOS}`,
        todoId,
        todoData
      )

      await updateDocument(
        `${collectionPath}/${COLLECTIONS.TECHNOLOGIES}`,
        technology.id,
        { todoIds: { ...technology.todoIds, [todoId]: true } },
        { merge: true }
      )
    } catch (error) {
      console.log('adding Todo', error)
    }

    setNewTodo('')
  }

  return (
    <Box py={2} key={technology.id}>
      <Title level={5} style={{ color: 'white' }}>
        {technology.name}
      </Title>
      {!!Object.keys(technology?.todoIds).length && (
        <>
          <TodoList
            technologyId={technology.id}
            planId={plan.id}
            todoIds={Object.keys(technology.todoIds)}
            ownTodos
          />
          <TodoList
            technologyId={technology.id}
            planId={plan.id}
            todoIds={Object.keys(technology.todoIds)}
          />
          {activePlanId && (
            <Input
              placeholder="Enter your todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onPressEnter={(value) => addTodo(value, technology)}
            />
          )}
        </>
      )}
    </Box>
  )
}

const TodoList = (props) => {
  // [INTERFACES]
  const { planId, todoIds, ownTodos, technologyId } = props

  // [COMPUTED_PROPERTIES]
  const refCollectionTodos = `${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.TODOS}`
  const refDocumentTechnology = `${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.TECHNOLOGIES}/${technologyId}`

  // [ADDITIONAL_HOOKS]
  const [todos, loading] = useCollectionData(
    todoIds?.length < 10 &&
      firestore.collection(refCollectionTodos).where('id', 'in', todoIds)
  )

  // [TEMPLATE]
  return (
    <>
      {!loading ? (
        <Box px={4} mb={3}>
          {ownTodos
            ? todos.map(
                (todo) =>
                  todo.readOnly && (
                    <TodoViewWIthActions
                      todo={todo}
                      refDocumentTechnology={refDocumentTechnology}
                      refDocumentTodo={`${refCollectionTodos}/${todo.id}`}
                    />
                  )
              )
            : todos.map(
                (todo) =>
                  !todo.readOnly && (
                    <TodoViewWIthActions
                      todo={todo}
                      refDocumentTechnology={refDocumentTechnology}
                      refDocumentTodo={`${refCollectionTodos}/${todo.id}`}
                    />
                  )
              )}
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  )
}
// [PROPTYPES]
TodoAdvancedList.propTypes = {
  plan: PropTypes.object.isRequired,
  activePlanId: PropTypes.string,
  ownTodos: PropTypes.bool
}
TodoList.propTypes = {
  planId: PropTypes.string.isRequired,
  todoIds: PropTypes.string.isRequired,
  ownTodos: PropTypes.bool,
  technologyId: PropTypes.string
}
export default TodoAdvancedList
