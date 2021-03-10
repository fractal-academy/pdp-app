import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'

/**
 * @info InterviewSimpleForm (10 Mar 2021) // CREATION DATE
 *
 * @comment InterviewSimpleForm - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewSimpleForm = (props) => {
  // [INTERFACES]
  const { onSubmit } = props

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [HELPER_FUNCTIONS]
  const onFinish = (data) => {
    data.question && onSubmit(data.question)
    form.resetFields()
  }

  // [TEMPLATE]
  return (
    <Form form={form} layout="inline" size="large" onFinish={onFinish}>
      <Form.Item style={{ flex: 1 }} name="question">
        <Input placeholder="Enter what student need to know" />
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
  onSubmit: PropTypes.func.isRequired
}

export default InterviewSimpleForm