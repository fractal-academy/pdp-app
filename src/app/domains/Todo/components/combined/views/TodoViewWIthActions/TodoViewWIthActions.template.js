import PropTypes from 'prop-types'
import { useState } from 'react'
import { Checkbox, Space } from 'antd'
import { Paragraph, Box, Remove } from 'antd-styled'
import { DeleteOutlined } from '@ant-design/icons'
import firestore from '~/services/Firebase/firestore/index'
/**
 * @info TodoViewWIthActions (15 Mar 2021) // CREATION DATE
 *
 * @comment TodoViewWIthActions - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const TodoViewWIthActions = (props) => {
  // [INTERFACES]
  const { todo, refTodoDocument } = props

  // [COMPONENT_STATE_HOOKS]
  const [isEdit, setIsEdit] = useState(false)

  // [HELPER_FUNCTIONS]
  const onChangeDone = () => {
    firestore.doc(refTodoDocument).set({
      ...todo,
      isDone: !todo.isDone
    })
  }

  const onEditTodo = (name) => {
    firestore.doc(refTodoDocument).set({
      ...todo,
      name: name
    })
    setIsEdit(false)
  }

  const onDeleteTodo = () => {
    firestore.doc(refTodoDocument).delete()
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
                editing: isEdit ? true : false,
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
              onSubmit={onDeleteTodo}
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
  technology: PropTypes.string.isRequired,
  refTodoDocument: PropTypes.string.isRequired
}

export default TodoViewWIthActions
