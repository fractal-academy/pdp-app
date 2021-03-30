import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
 * @since 30 Mar 2021 ( v.0.0.9 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewSimpleList = (props) => {
  // [INTERFACES]
  const { setQuestions, questions, onDeleteQuestion } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state

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
      let collectionPath = COLLECTIONS.QUESTIONS
      if (historyState.planId) {
        collectionPath = `${COLLECTIONS.PLANS}/${historyState.planId}/${COLLECTIONS.QUESTIONS}`
      }
      await updateDocument(collectionPath, id, { name: data.question })
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
          actions={
            !question.readOnly && [
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
            ]
          }>
          <QuestionViewWithForm
            question={question}
            isEdit={question.id === editQuestion}
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
