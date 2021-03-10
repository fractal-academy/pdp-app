import PropTypes from 'prop-types'
import { List, Typography, Input, Form } from 'antd'
import { Remove, Edit, Box } from 'antd-styled'
import {
  ConsoleSqlOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons'
import { useState, useRef, useEffect } from 'react'
const { Text } = Typography

/**
 * @info InterviewSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewSimpleList - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
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
  const onEdit = (todo, idx) => {
    setEditQuestion({ todo, idx })
  }

  const onSubmit = (value, idx) => {
    const newQuestions = [...questions]
    newQuestions[idx] = value.todo
    setQuestions(newQuestions)
    setEditQuestion(false)
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
                icon={<EditOutlined />}
                onClick={() => onEdit(question, idx)}
              />,
              <Remove
                onClick={() => setEditQuestion(false)}
                icon={<DeleteOutlined />}
                onSubmit={() => onDeleteQuestion(idx)}
              />
            ]}>
            {editQuestion.idx === idx ? (
              <Form
                form={form}
                style={{ width: '100%' }}
                layout="inline"
                onFinish={(todo) => onSubmit(todo, idx)}>
                <Form.Item style={{ flex: 1 }} name="todo">
                  <Input.TextArea
                    onPressEnter={(e) => {
                      e.preventDefault()
                      form.submit()
                    }}
                    rows={1}
                    ref={inputRef}
                    defaultValue={editQuestion.todo}
                  />
                </Form.Item>
              </Form>
            ) : (
              <Text>{question}</Text>
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
