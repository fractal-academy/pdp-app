import PropTypes from 'prop-types'
import { useRef } from 'react'
import { Button, Form, Input } from 'antd'

/**
 * @info TodoSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleForm - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoSimpleForm = (props) => {
  // [INTERFACES]
  const { onSubmit, loading, ...rest } = props

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
    <Form
      form={form}
      layout="inline"
      size="large"
      onFinish={onFinish}
      {...rest}>
      <Form.Item
        style={{ flex: 1 }}
        name="todo"
        hasFeedback={loading}
        validateStatus="validating">
        <Input
          placeholder="Enter what student need to do..."
          ref={inputRef}
          disabled={loading}
        />
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
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  rest: PropTypes.object
}

export default TodoSimpleForm
