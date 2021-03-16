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
 * @since 12 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewCreate = (props) => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]
  const [questions, setQuestions] = useState([])
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
  const onNext = () => {
    console.log('click')
  }
  const onBack = () => {
    history.replace(history.location.state.prevLocation, history.location.state)
  }
  // ----------------------------------

  // [TEMPLATE]
  return (
    <PageWrapper
      title="Create questions for interview"
      onBack={onBack}
      onNext={onNext}>
      <InterviewSimpleForm onSubmit={onSubmit} editQuestion={editQuestion} />
      <InterviewSimpleList
        setQuestions={setQuestions}
        questions={questions}
        onDeleteQuestion={onDeleteQuestion}
      />
    </PageWrapper>
  )
}

// [PROPTYPES]
InterviewCreate.propTypes = {}

export default InterviewCreate
