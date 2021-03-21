import PropTypes from 'prop-types'
import { useRef } from 'react'
import { Button, Form, Input } from 'antd'

/**
 * @info InterviewSimpleForm (10 Mar 2021) // CREATION DATE
 *
 * @comment InterviewSimpleForm - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewSimpleForm = (props) => {
  // [INTERFACES]
  const { onSubmit, loading } = props

  // [ADDITIONAL_HOOKS]
  const inputRef = useRef(null)
  const [form] = Form.useForm()

  // [HELPER_FUNCTIONS]
  const onFinish = (data) => {
    data.question && onSubmit(data.question)
    form.resetFields()
    inputRef.current.focus()
  }

  // [TEMPLATE]
  return (
    <Form form={form} layout="inline" size="large" onFinish={onFinish}>
      <Form.Item
        style={{ flex: 1 }}
        name="question"
        hasFeedback={loading}
        validateStatus="validating">
        <Input
          placeholder="Enter what student needs to know"
          ref={inputRef}
          disabled={loading}
        />
      </Form.Item>
      <Form.Item noStyle>
        <Button htmlType="submit" type="primary">
          Add question
        </Button>
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
InterviewSimpleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default InterviewSimpleForm
