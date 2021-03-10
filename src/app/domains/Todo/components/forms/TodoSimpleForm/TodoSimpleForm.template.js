import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'
import { forwardRef, useEffect } from 'react'
/**
 * @info TodoSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleForm - React component.
 *setFieldsValue
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoSimpleForm = forwardRef((props, ref) => {
  // [INTERFACES]
  const { onSubmit, editTodo } = props

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [HELPER_FUNCTIONS]
  const onFinish = (data) => {
    data.todo && onSubmit(data.todo)
    form.resetFields()
    ref.current.focus()
  }

  // [USE_EFFECTS]
  useEffect(() => {
    form.setFieldsValue({ todo: editTodo && editTodo.name })
  }, [editTodo])

  // [TEMPLATE]
  return (
    <Form form={form} layout="inline" size="large" onFinish={onFinish}>
      <Form.Item style={{ flex: 1 }} name="todo">
        <Input placeholder="Enter what student need to do..." ref={ref} />
      </Form.Item>
      <Form.Item noStyle>
        <Button htmlType="submit" type="primary">
          {editTodo ? 'Save' : 'Add task'}
        </Button>
      </Form.Item>
    </Form>
  )
})

// [PROPTYPES]
TodoSimpleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editTodo: PropTypes.object
}

export default TodoSimpleForm
