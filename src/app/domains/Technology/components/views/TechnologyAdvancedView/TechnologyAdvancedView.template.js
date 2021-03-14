import PropTypes from 'prop-types'
import { TechnologySimpleView } from 'domains/Technology/components/views'
import { Typography, Space } from 'antd'
import { Card } from 'antd-styled'
import firestore from '~/services/Firebase/firestore/index'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { MaterialSimpleView } from '~/app/domains/Material/components/views'
const { Text } = Typography

/**
 * @info TechnologyAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedView - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedView = (props) => {
  // [INTERFACES]
  const { technologyId } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.TECHNOLOGIES).doc(technologyId)
  )

  const [materials, loadingMaterial] = useCollectionData(
    !loading &&
      firestore
        .collection(COLLECTIONS.MATERIALS)
        .where('id', 'in', Object.keys(technology.materialTemplateIds))
  )

  // [TEMPLATE]
  if (loading || loadingMaterial)
    return <Text type="secondary">loading...</Text>

  return (
    <Card
      title={<TechnologySimpleView technologyId={technology.id} />}
      shadowless>
      <Space size="large">
        {materials?.map((item) => (
          <MaterialSimpleView {...item} />
        ))}
      </Space>
    </Card>
  )
}

// [PROPTYPES]
TechnologyAdvancedView.propTypes = {
  technologyId: PropTypes.string.isRequired
}

export default TechnologyAdvancedView
