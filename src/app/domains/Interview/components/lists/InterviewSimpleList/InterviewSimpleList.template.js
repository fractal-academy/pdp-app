import PropTypes from 'prop-types'
import { useState } from 'react'
import { List } from 'antd'
import { Remove, Edit } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { QuestionViewWithForm } from 'domains/Question/components/combined/views'
import { updateDocument } from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info InterviewSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewSimpleList - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewSimpleList = (props) => {
  // [INTERFACES]
  const { setQuestions, questions, onDeleteQuestion } = props

  // [COMPONENT_STATE_HOOKS]
  const [editQuestion, setEditQuestion] = useState('')

  // [HELPER_FUNCTIONS]
  const onEditSubmit = async (data, id) => {
    const editQuestionIndex = questions.findIndex(
      (question) => question.id === id
    )
    const newQuestions = [...questions]
    newQuestions[editQuestionIndex] = {
      name: data.question,
      id
    }

    try {
      await updateDocument(COLLECTIONS.QUESTIONS, id, { name: data.question })
    } catch (error) {
      console.log('question submit', error)
    }
    setEditQuestion('')
    setQuestions(newQuestions)
  }

  // [TEMPLATE]
  return (
    <List
      size="large"
      dataSource={questions}
      renderItem={(question) => (
        <List.Item
          actions={[
            <Edit
              shape="default"
              tooltip="Edit"
              type="text"
              icon={<EditOutlined />}
              onClick={() => setEditQuestion(question.id)}
            />,
            <Remove
              shape="default"
              tooltip="Remove"
              type="text"
              icon={<DeleteOutlined />}
              onSubmit={() => onDeleteQuestion(question.id)}
            />
          ]}>
          <QuestionViewWithForm
            question={question}
            isEdit={question.id === editQuestion}
            changeEditState={setEditQuestion}
            onFinish={onEditSubmit}
          />
        </List.Item>
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
