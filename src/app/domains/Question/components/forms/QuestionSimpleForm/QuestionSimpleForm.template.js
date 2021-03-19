import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { Form, Input } from 'antd'

/**
 * @info QuestionSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment QuestionSimpleForm - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const QuestionSimpleForm = (props) => {
  // [INTERFACES]
  const { onFinish, data, defaultValue } = props

  // [ADDITIONAL_HOOKS]
  const inputRef = useRef(null)
  const [questionForm] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  const [editLoading, setEditLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = async (value) => {
    setEditLoading(true)
    await onFinish(value, data.id)
    setEditLoading(false)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    inputRef.current.focus({
      cursor: 'end'
    })
  }, [])

  // [TEMPLATE]
  return (
    <Form
      form={questionForm}
      initialValues={{ question: defaultValue }}
      onFinish={onSubmit}>
      <Form.Item
        style={{ flex: 1, marginBottom: 0 }}
        name="question"
        hasFeedback={editLoading}
        validateStatus="validating">
        <Input.TextArea
          disabled={editLoading}
          // onBlur={() => questionForm.submit()}
          onPressEnter={() => questionForm.submit()}
          rows={1}
          ref={inputRef}
        />
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
QuestionSimpleForm.propTypes = {
  onFinish: PropTypes.func,
  defaultValue: PropTypes.string,
  data: PropTypes.object
}

export default QuestionSimpleForm
