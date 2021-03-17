import PropTypes from 'prop-types'
import { TechnologySimpleView } from 'domains/Technology/components/views'
import { Space } from 'antd'
import { Card } from 'antd-styled'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { MaterialSimpleView } from 'domains/Material/components/views'
import { Spinner } from '~/components'

/**
 * @info TechnologyAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedView - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedView = (props) => {
  // [INTERFACES]
  const { extra, name, materialIds, refCollectionMaterials } = props

  // [ADDITIONAL_HOOKS]
  const [materials, loading] = useCollectionData(
    firestore.collection(refCollectionMaterials).where('id', 'in', materialIds)
  )

  // [TEMPLATE]
  return (
    <Card title={<TechnologySimpleView name={name} />} shadowless extra={extra}>
      {loading ? (
        <Spinner />
      ) : (
        <Space size="large">
          {materials.map((item) => (
            <MaterialSimpleView {...item} />
          ))}
        </Space>
      )}
    </Card>
  )
}

// [PROPTYPES]
TechnologyAdvancedView.propTypes = {
  refCollectionMaterials: PropTypes.string.isRequired,
  extra: PropTypes.node,
  materialIds: PropTypes.array.isRequired,
  name: PropTypes.string
}

export default TechnologyAdvancedView
