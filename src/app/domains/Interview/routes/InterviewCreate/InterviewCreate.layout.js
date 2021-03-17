import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { InterviewSimpleList } from 'domains/Interview/components/lists'
import { InterviewSimpleForm } from 'domains/Interview/components/forms'
import { PageWrapper } from '~/components/HOC'
import _ from 'lodash'

/**
 * @info InterviewCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewCreate - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state
  const currentLevels = historyState.selectedLevel
  let currentLevelQuestions = []

  // Check if there are already exist todos for currentLevels
  if (historyState?.interviewTemplates) {
    currentLevelQuestions =
      historyState.interviewTemplates?.[currentLevels.levelId]?.[
        currentLevels.subLevelId
      ]
  }

  // [COMPONENT_STATE_HOOKS]
  const [questions, setQuestions] = useState(currentLevelQuestions || [])
  const [editQuestion, setEditQuestion] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = (value) => {
    value && setQuestions([...questions, value])
    setEditQuestion('')
  }

  const onDeleteQuestion = (idx) => {
    const newQuestions = _.remove(questions, (item, index) => {
      return index !== idx
    })
    setQuestions(newQuestions)
  }

  // -- Header step button functions --
  const onSave = () => {
    const { levelId, subLevelId } = historyState.selectedLevel
    if (questions.length) {
      let currentLevelTodos = { [subLevelId]: questions }
      if (historyState?.interviewTemplates) {
        currentLevelTodos = {
          ...historyState?.interviewTemplates[levelId],
          [subLevelId]: questions
        }
      }

      return history.push(historyState.prevLocation, {
        ...historyState,
        interviewTemplates: {
          ...historyState?.interviewTemplates,
          [levelId]: currentLevelTodos
        }
      })
    }
    // If there are no interviews delete empty object from history state
    if (historyState?.interviewTemplates) {
      delete historyState?.interviewTemplates[levelId][subLevelId]
      // Check if there was last item is this level delete level object
      if (!Object.values(historyState?.interviewTemplates[levelId]).length) {
        delete historyState?.interviewTemplates[levelId]
      }
    }
    history.push(historyState.prevLocation, historyState)
  }
  const onBack = () => {
    history.push(historyState.prevLocation, historyState)
  }
  // ----------------------------------

  // [TEMPLATE]
  return (
    <PageWrapper
      title="Create questions for interview"
      nextBtnProps={{ text: 'Save' }}
      onNext={onSave}
      onBack={onBack}>
      <InterviewSimpleForm onSubmit={onSubmit} editQuestion={editQuestion} />
      <InterviewSimpleList
        setQuestions={setQuestions}
        questions={questions}
        onDeleteQuestion={onDeleteQuestion}
      />
    </PageWrapper>
  )
}

export default InterviewCreate
