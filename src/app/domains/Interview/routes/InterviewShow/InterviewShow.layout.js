import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { PageWrapper } from '~/components/HOC'
import firestore, {
  getDocumentData,
  updateDocument
} from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner } from '~/components'
import { Checkbox, List, Space } from 'antd'
import { Box, Col, Row, Text, Title } from 'antd-styled'
import { QuestionSimpleView } from 'domains/Question/components/views'
import { useCollectionArray } from '~/hooks/firebase'

/**
 * @info InterviewShow (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewShow - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewShow = () => {
  // [ADDITIONAL_HOOKS]
  const { id } = useParams()
  const history = useHistory()
  const [interviews, loadingInterviews] = useCollectionData(
    firestore.collection(`${COLLECTIONS.PLANS}/${id}/${COLLECTIONS.INTERVIEWS}`)
  )

  // [COMPONENT_STATE_HOOKS]
  const [answers, setAnswers] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = async () => {
    //TODO assign technologies for student
    setSubmitLoading(true)
    const collectionPath = `${COLLECTIONS.PLANS}/${id}/${COLLECTIONS.INTERVIEWS}`

    for (const interview of interviews) {
      let mark = 0
      if (answers[interview.id]) {
        const questionsCount =
          answers[interview.id].wrong + answers[interview.id].right
        mark = (answers[interview.id].right / questionsCount) * 100
      }

      await updateDocument(collectionPath, interview.id, { mark })
      //TODO move status to constants
      await updateDocument(COLLECTIONS.PLANS, id, { status: 'confirmed' })
    }
    history.goBack()
    setSubmitLoading(false)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    const fetchPlan = async () => {
      const plan = await getDocumentData(COLLECTIONS.PLANS, id)
      if (plan.status === 'confirmed') {
        setIsConfirmed(true)
      }
    }
    fetchPlan()
  }, [])

  // [TEMPLATE]
  if (loadingInterviews) return <Spinner />
  return (
    <>
      {!isConfirmed ? (
        <PageWrapper
          title="Interview review"
          onNext={onSubmit}
          nextBtnProps={{ text: 'Submit', loading: submitLoading }}
          inlineHeader>
          {interviews.map((interview) => (
            <ListItemQuestions
              {...interview}
              planId={id}
              key={interview.id}
              setAnswers={setAnswers}
            />
          ))}
        </PageWrapper>
      ) : (
        <PageWrapper
          title="Interview review"
          onBack={() => history.goBack()}
          backBtnLeft
          inlineHeader>
          {interviews.map((interview) => (
            <ListItemResult {...interview} planId={id} key={interview.id} />
          ))}
        </PageWrapper>
      )}
    </>
  )
}

const ListItemResult = (props) => {
  // [INTERFACES]
  const { planId, technologyId, questionIds, mark } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loadingTechnology] = useDocumentData(
    firestore.doc(
      `${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.TECHNOLOGIES}/${technologyId}`
    )
  )
  const [questions, loadingQuestions] = useCollectionArray(
    `${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.QUESTIONS}`,
    questionIds
  )
  // [TEMPLATE]
  if (loadingTechnology || loadingQuestions) return <Spinner />
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Title level={4}>{technology.name} </Title>
        <Text>{Math.floor(mark)}% - right answers</Text>
      </Box>
      <List
        grid={{ column: 1 }}
        dataSource={questions}
        renderItem={(question) => (
          <List.Item>
            <Row>
              <Col
                span={24}
                mb={2}
                display="flex"
                justifyContent="space-between">
                <Space>
                  <Text strong>Question:</Text>
                  <QuestionSimpleView text={question.name} />
                </Space>
              </Col>
              <Col span={24}>
                <Space>
                  <Text strong>Answer:</Text>
                  <Text>{question.answer}</Text>
                </Space>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  )
}

const ListItemQuestions = (props) => {
  // [INTERFACES]
  const { planId, technologyId, questionIds, setAnswers } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loadingTechnology] = useDocumentData(
    firestore.doc(
      `${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.TECHNOLOGIES}/${technologyId}`
    )
  )
  const [questions, loadingQuestions] = useCollectionArray(
    `${COLLECTIONS.PLANS}/${planId}/${COLLECTIONS.QUESTIONS}`,
    questionIds
  )

  // [HELPER_FUNCTIONS]
  const checkAnswer = (e) => {
    setAnswers((prev) => {
      let answer = { ...prev }
      answer[props.id] = {}
      if (e.target.checked) {
        answer[props.id].right = prev?.[props.id]?.right
          ? ++prev[props.id].right
          : 1
      } else {
        answer[props.id].right = prev?.[props.id]?.right
          ? --prev[props.id].right
          : 0
      }
      answer[props.id].wrong = questions.length - answer[props.id].right
      return answer
    })
  }

  // [TEMPLATE]
  if (loadingTechnology || loadingQuestions) return <Spinner />
  return (
    <>
      <Title level={4}>{technology.name}</Title>
      <List
        grid={{ column: 1 }}
        dataSource={questions}
        renderItem={(question) => (
          <List.Item>
            <Row>
              <Col
                span={24}
                mb={2}
                display="flex"
                justifyContent="space-between">
                <Space>
                  <Text strong>Question:</Text>
                  <QuestionSimpleView text={question.name} />
                </Space>
                <Checkbox onChange={checkAnswer}>Correct</Checkbox>
              </Col>
              <Col span={24}>
                <Space>
                  <Text strong>Answer:</Text>
                  <Text>{question.answer}</Text>
                </Space>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  )
}

export default InterviewShow
