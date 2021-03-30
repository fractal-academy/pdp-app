import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Typography, List, Form, Input, message } from 'antd'
import { Row, Col } from 'antd-styled'
import { PageWrapper } from '~/components/HOC'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner } from '~/components'
import { QuestionSimpleView } from 'domains/Question/components/views'
const { Title } = Typography
/**
 * @info InterviewEdit (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewEdit - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.2) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewEdit = () => {
  // [ADDITIONAL_HOOKS]
  const { id } = useParams()
  const [interviews, loadingInterviews] = useCollectionData(
    firestore.collection(`${COLLECTIONS.PLANS}/${id}/${COLLECTIONS.INTERVIEWS}`)
  )
  const [form] = Form.useForm()
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const sendAnswers = async (answers) => {
    setLoading(true)
    try {
      for (const answerId of Object.keys(answers)) {
        await firestore
          .doc(
            `${COLLECTIONS.PLANS}/${id}/${COLLECTIONS.QUESTIONS}/${answerId}`
          )
          .set({ answer: answers[answerId] }, { merge: true })
      }
      await firestore
        .doc(`${COLLECTIONS.PLANS}/${id}`)
        .set({ status: 'finished' }, { merge: true })
      message.success('Your answers were sent')

      history.goBack()
    } catch (error) {
      message.error(error.message)
    }
    setLoading(false)
  }

  // [TEMPLATE]
  if (loadingInterviews) return <Spinner />

  return (
    <PageWrapper
      title="My interview"
      onNext={form.submit}
      nextBtnProps={{ loading }}>
      <Form form={form} name="answers" onFinish={sendAnswers}>
        {interviews.map((interview) => (
          <ListItemQuestions {...interview} planId={id} key={interview.id} />
        ))}
      </Form>
    </PageWrapper>
  )
}

const ListItemQuestions = (props) => {
  // [INTERFACES]
  const { planId, technologyId, questionIds } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loadingTechnology] = useDocumentData(
    firestore.doc(
      `${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.TECHNOLOGIES}/${technologyId}`
    )
  )
  const [questions, loadingQuestions] = useCollectionData(
    firestore
      .collection(`${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.QUESTIONS}`)
      .where('id', 'in', questionIds)
  )

  // [TEMPLATE]
  if (loadingTechnology || loadingQuestions) return <Spinner />
  return (
    questions.length && (
      <>
        <Title level={4}>{technology.name}</Title>
        <List
          dataSource={questions}
          renderItem={(question) => (
            <Row>
              <Col span={24} mb={2}>
                <QuestionSimpleView text={question.name} />
              </Col>
              <Col span={24}>
                <Form.Item
                  name={question.id}
                  rules={[
                    { required: true, message: 'You must enter your answer' }
                  ]}>
                  <Input.TextArea rows={2} placeholder="Enter your answer" />
                </Form.Item>
              </Col>
            </Row>
          )}
        />
      </>
    )
  )
}

// [PROPTYPES]
ListItemQuestions.propTypes = {
  planId: PropTypes.string.isRequired,
  technologyId: PropTypes.string.isRequired,
  questionIds: PropTypes.array
}

export default InterviewEdit
