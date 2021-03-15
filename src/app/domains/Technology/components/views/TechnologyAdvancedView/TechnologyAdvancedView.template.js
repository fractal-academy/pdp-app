import PropTypes from 'prop-types'
import { TechnologySimpleView } from 'domains/Technology/components/views'
import { Space } from 'antd'
import { Card } from 'antd-styled'
import firestore from '~/services/Firebase/firestore/index'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner } from '~/components'
import { MaterialSimpleView } from '~/app/domains/Material/components/views'

/**
 * @info TechnologyAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedView - React component.
 *
 * @since 15 Mar 2021 ( v.0.06 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedView = (props) => {
  // [INTERFACES]
  const { technologyId, extra } = props

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

  return (
    <>
      {!loadingMaterial && !loading ? (
        <Card
          title={<TechnologySimpleView name={technology.name} />}
          shadowless
          extra={extra}>
          <Space size="large">
            {materials?.map((item) => (
              <MaterialSimpleView {...item} />
            ))}
          </Space>
        </Card>
      ) : (
        <Spinner />
      )}
    </>
  )
}

// [PROPTYPES]
TechnologyAdvancedView.propTypes = {
  technologyId: PropTypes.string.isRequired,
  extra: PropTypes.node
}

export default TechnologyAdvancedView
