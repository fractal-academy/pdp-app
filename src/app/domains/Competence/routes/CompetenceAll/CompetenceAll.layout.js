import { CompetenceSimpleList } from 'domains/Competence/components/lists'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { LoadingOutlined } from '@ant-design/icons'
import { Box } from 'antd-styled'
import { Typography, Spin } from 'antd'
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
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          height="100%"
          alignItems="center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </Box>
      ) : (
        <CompetenceSimpleList data={competences} />
      )}
    </>
  )
}

export default CompetenceAll
