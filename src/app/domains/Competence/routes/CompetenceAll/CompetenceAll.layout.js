import { CompetenceSimpleList } from 'domains/Competence/components/lists'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { Typography } from 'antd'
import { Spinner } from '~/components'
const { Title } = Typography
/**
 * @info CompetenceAll (05 Mar 2021) // CREATION DATE
 *
 * @comment CompetenceAll - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompetenceAll = (props) => {
  // [ADDITIONAL_HOOKS]
  const [competences, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.COMPETENCES)
  )

  // [TEMPLATE]
  return (
    <>
      <Title>Competences</Title>
      {loading ? <Spinner /> : <CompetenceSimpleList data={competences} />}
    </>
  )
}

export default CompetenceAll
