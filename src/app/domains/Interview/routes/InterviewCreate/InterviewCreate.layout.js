import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { InterviewSimpleList } from 'domains/Interview/components/lists'
import { InterviewSimpleForm } from 'domains/Interview/components/forms'
import { PageWrapper } from '~/components/HOC'
import _ from 'lodash'
import {
  getTimestamp,
  deleteDocument,
  setDocument,
  getDocumentRef
} from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info InterviewCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewCreate - React component.
 *
 * @since 18 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state
  const currentLevels = historyState.selectedLevel
  let currentLevelQuestions

  // Check if there are already exist todos for currentLevels
  if (historyState?.questionIds) {
    currentLevelQuestions =
      historyState.questionIds?.[currentLevels.levelId]?.[
        currentLevels.subLevelId
      ]
  }

  // [COMPONENT_STATE_HOOKS]
  const [questions, setQuestions] = useState(currentLevelQuestions || [])
  const [questionAddLoading, setQuestionAddLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = async (value) => {
    if (value) {
      setQuestionAddLoading(true)

      try {
        const questionId = getDocumentRef(COLLECTIONS.QUESTIONS).id

        const questionData = {
          id: questionId,
          name: value,
          createdAt: getTimestamp().now()
        }

        await setDocument(COLLECTIONS.QUESTIONS, questionId, questionData)
        setQuestions([
          ...questions,
          { name: questionData.name, id: questionId }
        ])
      } catch (e) {
        console.log(e)
      }
      setQuestionAddLoading(false)
    }
  }

  const onDeleteQuestion = async (questionId) => {
    const newQuestions = _.filter(questions, (item) => item.id !== questionId)
    try {
      await deleteDocument(COLLECTIONS.QUESTIONS, questionId)
    } catch (error) {
      console.log('interview delete', error)
    }
    setQuestions(newQuestions)
  }

  // -- Header step button functions --
  const onSave = () => {
    const { levelId, subLevelId } = historyState.selectedLevel
    if (questions.length) {
      let currentLevelTodos = { [subLevelId]: questions }
      if (historyState?.questionIds) {
        currentLevelTodos = {
          ...historyState?.questionIds[levelId],
          [subLevelId]: questions
        }
      }

      return history.push(historyState.prevLocation, {
        ...historyState,
        questionIds: {
          ...historyState?.questionIds,
          [levelId]: currentLevelTodos
        }
      })
    }
    // If there are no interviews delete empty object from history state
    if (historyState?.questionIds) {
      delete historyState?.questionIds[levelId][subLevelId]
      // Check if there was last item is this level delete level object
      if (!Object.values(historyState?.questionIds[levelId]).length) {
        delete historyState?.questionIds[levelId]
      }
    }
    history.push(historyState.prevLocation, historyState)
  }
  // ----------------------------------

  // [TEMPLATE]
  return (
    <PageWrapper
      title="Create questions for interview"
      nextBtnProps={{ text: 'Save' }}
      onNext={onSave}
      onBack={onSave}>
      <InterviewSimpleForm onSubmit={onSubmit} loading={questionAddLoading} />
      <InterviewSimpleList
        setQuestions={setQuestions}
        questions={questions}
        onDeleteQuestion={onDeleteQuestion}
      />
    </PageWrapper>
  )
}

export default InterviewCreate
