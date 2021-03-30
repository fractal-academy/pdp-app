import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd-styled'
import { useCollectionArray } from 'hooks/firebase'
import { TechnologySimpleView } from 'domains/Technology/components/views'
import { MaterialSimpleView } from 'domains/Material/components/views'
import { Spinner } from '~/components'

/**
 * @info TechnologyAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedView - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.9 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedView = (props) => {
  // [INTERFACES]
  const { extra, name, materialIds = [], refCollectionMaterials } = props

  // [ADDITIONAL_HOOKS]
  const [materials, loading] = useCollectionArray(
    refCollectionMaterials,
    materialIds
  )

  // [TEMPLATE]
  return (
    <Card title={<TechnologySimpleView name={name} />} shadowless extra={extra}>
      {loading ? (
        <Spinner />
      ) : (
        <Row gutter={[4, 8]}>
          {materials?.map((item) => (
            <Col>
              <MaterialSimpleView {...item} tag size="sm" />
            </Col>
          ))}
        </Row>
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
