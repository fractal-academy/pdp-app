import { Button } from 'antd'
import { Row, Col, Back, HeadingPrimary } from 'antd-styled'
import { InterviewSimpleList } from 'domains/Interview/components/lists'
import { InterviewSimpleForm } from 'domains/Interview/components/forms'
import { useState } from 'react'
import _ from 'lodash'

/**
 * @info InterviewCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewCreate - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewCreate = (props) => {
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

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Row gutter={[8]} mb={3} justify="space-between">
          <Col>
            <Back size="large">Back</Back>
          </Col>
          <Col>
            <Button size="large" type="primary">
              Next
            </Button>
          </Col>
        </Row>
        <HeadingPrimary title="Create questions for interview" />
        <Row gutter={[8, 16]} justify="center">
          <Col span={16}>
            <InterviewSimpleForm
              onSubmit={onSubmit}
              editQuestion={editQuestion}
            />
          </Col>
          <Col span={16}>
            <InterviewSimpleList
              setQuestions={setQuestions}
              questions={questions}
              onDeleteQuestion={onDeleteQuestion}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

// [PROPTYPES]
InterviewCreate.propTypes = {}

export default InterviewCreate
