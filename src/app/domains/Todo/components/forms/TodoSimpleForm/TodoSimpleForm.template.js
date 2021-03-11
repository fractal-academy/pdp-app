import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'
import { useRef } from 'react'
/**
 * @info TodoSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleForm - React component.
 *
 * @since 11 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoSimpleForm = (props) => {
  // [INTERFACES]
  const { onSubmit } = props

  // [ADDITIONAL_HOOKS]
  const inputRef = useRef(null)
  const [form] = Form.useForm()

  // [HELPER_FUNCTIONS]
  const onFinish = (data) => {
    data.todo && onSubmit(data.todo)
    form.resetFields()
    inputRef.current.focus()
  }

  // [TEMPLATE]
  return (
    <Form form={form} layout="inline" size="large" onFinish={onFinish}>
      <Form.Item style={{ flex: 1 }} name="todo">
        <Input placeholder="Enter what student need to do..." ref={inputRef} />
      </Form.Item>
      <Form.Item noStyle>
        <Button htmlType="submit" type="primary">
          Add task
        </Button>
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
TodoSimpleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default TodoSimpleForm
