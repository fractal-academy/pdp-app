import PropTypes from 'prop-types'
import { useState } from 'react'
import { Input } from 'antd'
import { Title, Box, Text } from 'antd-styled'
import { TodoViewWIthActions } from 'domains/Todo/components/combined/views'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner } from '~/components'

/**
 * @info TodoAdvancedList (14 Mar 2021) // CREATION DATE
 *
 * @comment TodoAdvancedList - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.3) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoAdvancedList = (props) => {
  // [INTERFACES]
  const { plan, activePlanId } = props

  // [ADDITIONAL_HOOKS]
  const [technologies, loading] = useCollectionData(
    firestore
      .collection(COLLECTIONS.PLANS)
      .doc(plan.id)
      .collection(COLLECTIONS.TECHNOLOGIES)
  )

  // [COMPONENT_STATE_HOOKS]
  const [newTodo, setNewTodo] = useState('')

  // [HELPER_FUNCTIONS]
  const addTodo = async (value, technology) => {
    const id = await firestore
      .collection(COLLECTIONS.PLANS)
      .doc(plan.id)
      .collection(COLLECTIONS.TODOS)
      .doc().id
    await firestore
      .collection(COLLECTIONS.PLANS)
      .doc(plan.id)
      .collection(COLLECTIONS.TODOS)
      .doc(id)
      .set({ name: value.target.value, id: id, readOnly: false, isDone: false })
    firestore
      .collection(COLLECTIONS.PLANS)
      .doc(plan.id)
      .collection(COLLECTIONS.TECHNOLOGIES)
      .doc(technology.id)
      .set({ ...technology, todoIds: { ...technology.todoIds, [id]: true } })
    setNewTodo('')
  }

  // [TEMPLATE]
  return (
    <>
      <Title level={4} style={{ color: 'white' }}>
        {plan.name}
      </Title>
      {loading ? (
        <Spinner />
      ) : (
        technologies.map((technology) => (
          <Box py={2}>
            {technology.todoIds && (
              <>
                <Title level={5} style={{ color: 'white' }}>
                  {technology.name}
                </Title>
                <TodoList
                  planId={plan.id}
                  todoIds={Object.keys(technology.todoIds)}
                  ownTodos
                />
                {activePlanId && (
                  <Text color="#ffffff" display="flex" justifyContent="center">
                    Your todos
                  </Text>
                )}
                <TodoList
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
        ))
      )}
    </>
  )
}
const TodoList = (props) => {
  // [INTERFACES]
  const { planId, todoIds, ownTodos } = props

  // [ADDITIONAL_HOOKS]
  const [todos, loading] = useCollectionData(
    firestore
      .collection(COLLECTIONS.PLANS)
      .doc(planId)
      .collection(COLLECTIONS.TODOS)
      .where('id', 'in', todoIds)
  )

  // [TEMPLATE]
  return (
    <>
      {!loading ? (
        <Box px={4}>
          {ownTodos
            ? todos.map(
                (todo) =>
                  todo.readOnly && (
                    <TodoViewWIthActions
                      todo={todo}
                      refTodoDocument={`${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.TODOS}/${todo.id}`}
                    />
                  )
              )
            : todos.map(
                (todo) =>
                  !todo.readOnly && (
                    <TodoViewWIthActions
                      todo={todo}
                      refTodoDocument={`${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.TODOS}/${todo.id}`}
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
  ownTodos: PropTypes.bool
}
export default TodoAdvancedList
