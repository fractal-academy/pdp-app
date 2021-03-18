import PropTypes from 'prop-types'
import { List, Input, Form, Col } from 'antd'
import { Remove, Edit, Box, Text, Row } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useState, useRef, useEffect } from 'react'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info InterviewSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewSimpleList - React component.
 *
 * @since 18 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
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
  const [editLoading, setEditLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = async (data, id) => {
    setEditLoading(true)
    const editQuestionIndex = questions.findIndex(
      (question) => question.id === id
    )
    const newQuestions = [...questions]
    newQuestions[editQuestionIndex] = {
      name: data.question || editQuestion.name,
      id
    }

    try {
      await firestore
        .collection(COLLECTIONS.QUESTIONS)
        .doc(id)
        .update({ name: data.question })
    } catch (error) {
      console.log('question submit', error)
    }
    setQuestions(newQuestions)
    setEditQuestion(false)
    setEditLoading(false)
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
      renderItem={(question) => (
        <Box width="100%">
          <List.Item
            actions={[
              <Edit
                shape="default"
                tooltip="Edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => setEditQuestion(question)}
              />,
              <Remove
                shape="default"
                tooltip="Remove"
                type="text"
                onClick={() => setEditQuestion(false)}
                icon={<DeleteOutlined />}
                onSubmit={() => onDeleteQuestion(question.id)}
              />
            ]}>
            {editQuestion.id === question.id ? (
              <Row flex={1}>
                <Col span={24}>
                  <Form
                    form={form}
                    onFinish={(value) => onSubmit(value, question.id)}>
                    <Form.Item
                      style={{ flex: 1 }}
                      name="question"
                      hasFeedback={editLoading}
                      validateStatus="validating">
                      <Input.TextArea
                        disabled={editLoading}
                        onPressEnter={(e) => {
                          e.preventDefault()
                          form.submit()
                        }}
                        rows={1}
                        ref={inputRef}
                        defaultValue={editQuestion.name}
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            ) : (
              <Text ellipsis>{question.name}</Text>
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
