import { useHistory, generatePath } from 'react-router-dom'
import { Table, Typography, Button } from 'antd'
import { useRole } from 'contexts/Role/hooks'
import { useSession } from 'contexts/Session/hooks'
import { ROLES } from '~/constants'
import { PageWrapper } from '~/components/HOC'
import firestore from '~/services/Firebase/firestore/index'
import { COLLECTIONS, ROUTE_PATHS } from 'app/constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Spinner, Status } from '~/components'
const { Text } = Typography

/**
 * @info InterviewAll (05 Mar 2021) // CREATION DATE
 *
 * @comment InterviewAll - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const InterviewAll = () => {
  // [ADDITIONAL_HOOKS]
  const role = useRole()
  const history = useHistory()
  const session = useSession()
  const [interviews, loading] = useCollectionData(
    role.role === ROLES.STUDENT
      ? firestore
          .collection(COLLECTIONS.PLANS)
          .where('studentId', '==', session.studentId)
      : firestore
          .collection(COLLECTIONS.PLANS)
          .where('mentorId', '==', session.mentorId)
  )

  // [HELPER_FUNCTIONS]
  const goBack = () => {
    history.goBack()
  }
  const showResults = (planId) => {
    /**
     * for showing and checking results
     */
    history.push(generatePath(ROUTE_PATHS.INTERVIEW_SHOW, { id: planId }))
  }

  const columns = [
    {
      title: 'Plan name',
      key: 'plan',
      render: (text, data) => <Text>{data.name}</Text>
    },
    {
      title:
        role.role === ROLES.MENTOR
          ? `${ROLES.STUDENT[0].toUpperCase()}${ROLES.STUDENT.slice(1)}`
          : `${ROLES.MENTOR[0].toUpperCase()}${ROLES.MENTOR.slice(1)}`,
      key: role.role,
      render: (text, data) => (
        <FirstName
          studentId={data.studentId}
          mentorId={data?.mentorId}
          role={role.role}
        />
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (text, data) => (
        <Status status={data.status} display="inline-flex" />
      )
    },
    {
      title: 'Mark',
      key: 'mark',
      render: (text, data) =>
        (data.status === 'confirmed' && <MarkSimpleView planId={data.id} />) ||
        (data.status === 'finished' && role.role === 'mentor' && (
          <Button onClick={() => showResults(data.id)}>Check results</Button>
        ))
    }
  ]

  // [TEMPLATE]
  if (loading) return <Spinner />
  return (
    <PageWrapper
      title="Interviews"
      onBack={goBack}
      backBtnLeft
      inlineHeader
      fullWidth
      pagination={false}>
      <Table dataSource={interviews} columns={columns} pagination={false} />
    </PageWrapper>
  )
}

const FirstName = (props) => {
  const { role, studentId, mentorId } = props
  console.log(props)
  const [user, loading] = useCollectionData(
    role === 'student'
      ? firestore
          .collection(COLLECTIONS.USERS)
          .where('mentorId', '==', mentorId)
      : firestore
          .collection(COLLECTIONS.USERS)
          .where('studentId', '==', studentId)
  )
  if (loading) return <Spinner />

  return <Text>{user[0]?.firstName}</Text>
}

const MarkSimpleView = (props) => {
  // [INTERFACES]
  const { planId } = props

  // [ADDITIONAL_HOOKS]
  const [interviews, loading] = useCollectionData(
    firestore
      .collection(COLLECTIONS.PLANS)
      .doc(planId)
      .collection(COLLECTIONS.INTERVIEWS)
  )

  // [COMPUTED_PROPERTIES]
  let mark = 0

  if (!loading) {
    for (const interview of interviews) {
      mark += interview.mark
    }
    mark = Math.floor(mark / interviews.length)
  }

  // [TEMPLATE]
  if (loading) return <Spinner />

  return <Text>{mark}</Text>
}

export default InterviewAll
