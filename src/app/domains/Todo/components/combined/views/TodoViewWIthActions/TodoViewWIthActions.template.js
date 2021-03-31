import PropTypes from 'prop-types'
import { useState } from 'react'
import { Checkbox, Space } from 'antd'
import { Paragraph, Box, Remove } from 'antd-styled'
import { DeleteOutlined } from '@ant-design/icons'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'

/**
 * @info TodoViewWIthActions (15 Mar 2021) // CREATION DATE
 *
 * @comment TodoViewWIthActions - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.4) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const TodoViewWIthActions = (props) => {
  // [INTERFACES]
  const { todo, refDocumentTodo, refDocumentTechnology } = props

  // [ADDITIONAL_HOOKS]
  const [technology] = useDocumentData(
    refDocumentTechnology && firestore.doc(refDocumentTechnology)
  )

  // [COMPONENT_STATE_HOOKS]
  const [isEdit, setIsEdit] = useState(false)

  // [HELPER_FUNCTIONS]
  const onChangeDone = () => {
    firestore.doc(refDocumentTodo).set({
      ...todo,
      isDone: !todo.isDone
    })
  }

  const onEditTodo = (name) => {
    firestore.doc(refDocumentTodo).set({
      ...todo,
      name: name
    })
    setIsEdit(false)
  }

  const onDeleteTodo = async () => {
    await firestore.doc(refDocumentTodo).delete()
    const newTodoIds = {}

    for (const item of Object.keys(technology.todoIds)) {
      if (item !== todo.id) newTodoIds[item] = true
    }
    firestore
      .doc(refDocumentTechnology)
      .set({ ...technology, todoIds: { ...newTodoIds } })
  }

  // [TEMPLATE]
  return (
    <>
      {todo && (
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Space>
            {!isEdit && (
              <Checkbox checked={todo.isDone} onChange={onChangeDone} />
            )}
            <Paragraph
              display="inline-block"
              color="white"
              onClick={() => !todo.readOnly && setIsEdit(true)}
              editable={{
                icon: <></>,
                editing: isEdit,
                onChange: onEditTodo
              }}>
              {todo.name}
            </Paragraph>
          </Space>
          {!todo.readOnly && (
            <Remove
              shape="default"
              tooltip="Remove"
              type="text"
              icon={<DeleteOutlined />}
              onSubmit={technology && onDeleteTodo}
            />
          )}
        </Box>
      )}
    </>
  )
}

// [PROPTYPES]
TodoViewWIthActions.propTypes = {
  todo: PropTypes.string.isRequired,
  refDocumentTodo: PropTypes.string.isRequired
}

export default TodoViewWIthActions
