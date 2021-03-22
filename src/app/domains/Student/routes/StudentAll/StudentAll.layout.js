import { StudentSimpleTable } from 'domains/Student/components/tables'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { PageWrapper } from '~/components/HOC'
import { COLLECTIONS } from 'app/constants'
import { ROLES } from '~/constants'

/**
 * @info StudentAll (08 Mar 2021) // CREATION DATE
 *
 * @comment StudentAll - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const StudentAll = () => {
  const [students, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.USERS).where('role', '==', ROLES.STUDENT)
  )

  // [TEMPLATE]
  return (
    <PageWrapper title="Students" inlineHeader fullWidth>
      <StudentSimpleTable data={students} loading={loading} />
    </PageWrapper>
  )
}

// [PROPTYPES]
StudentAll.propTypes = {}

export default StudentAll
