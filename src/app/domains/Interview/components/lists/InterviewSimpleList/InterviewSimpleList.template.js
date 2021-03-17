import PropTypes from 'prop-types'
import { List, Input, Form, Col } from 'antd'
import { Remove, Edit, Box, Text, Row } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useState, useRef, useEffect } from 'react'

/**
 * @info InterviewSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewSimpleList - React component.
 *
 * @since 11 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewSimpleList = (props) => {
  // [INTERFACES]
  const { setQuestions, questions, onDeleteQuestion } = props

  // [ADDITIONAL_HOOKS]
  const inputRef = useRef(null)
  const [form] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  const [editQuestion, setEditQuestion] = useState(false)

  // [HELPER_FUNCTIONS]
  const onEdit = (question, idx) => {
    setEditQuestion({ question, idx })
  }

  const onSubmit = (value, idx) => {
    const newQuestions = [...questions]
    newQuestions[idx] = value.question || editQuestion.question
    setQuestions(newQuestions)
    setEditQuestion(false)
    form.resetFields()
  }

  // [USE_EFFECTS]
  useEffect(() => {
    editQuestion &&
      inputRef.current.focus({
        cursor: 'end'
      })
  }, [editQuestion])

  // [TEMPLATE]
  return (
    <List
      size="large"
      dataSource={questions}
      renderItem={(question, idx) => (
        <Box width="100%">
          <List.Item
            actions={[
              <Edit
                shape="default"
                tooltip="Edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit(question, idx)}
              />,
              <Remove
                shape="default"
                tooltip="Remove"
                type="text"
                onClick={() => setEditQuestion(false)}
                icon={<DeleteOutlined />}
                onSubmit={() => onDeleteQuestion(idx)}
              />
            ]}>
            {editQuestion.idx === idx ? (
              <Row flex={1}>
                <Col span={24}>
                  <Form
                    form={form}
                    onFinish={(question) => onSubmit(question, idx)}>
                    <Form.Item style={{ flex: 1 }} name="question">
                      <Input.TextArea
                        onPressEnter={(e) => {
                          e.preventDefault()
                          form.submit()
                        }}
                        rows={1}
                        ref={inputRef}
                        defaultValue={editQuestion.question}
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            ) : (
              <Text ellipsis>{question}</Text>
            )}
          </List.Item>
        </Box>
      )}
    />
  )
}

// [PROPTYPES]
InterviewSimpleList.propTypes = {
  questions: PropTypes.array,
  setQuestions: PropTypes.func,
  onDeleteQuestion: PropTypes.func
}

export default InterviewSimpleList
