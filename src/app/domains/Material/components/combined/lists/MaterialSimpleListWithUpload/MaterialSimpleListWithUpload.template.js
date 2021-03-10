import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { MaterialSimpleFormWithUpload } from 'domains/Material/components/combined/forms'
import { MaterialSimpleList } from 'domains/Material/components/lists'

/**
 * @info MaterialSimpleListWithUpload (10 Mar 2021) // CREATION DATE
 *
 * @comment MaterialSimpleListWithUpload - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MaterialSimpleListWithUpload = (props) => {
  // [INTERFACES]
  /*
  code sample:
  const { data } = props
  */

  // [ADDITIONAL_HOOKS]
  /*
  code sample:
  const firestore = useFirestore()
  */

  // [COMPONENT_STATE_HOOKS]
  /*
  code sample:
  const singleton = useRef(true) // references also put here
  const [state, setState] = useState({})
  */

  // [HELPER_FUNCTIONS]

  // [COMPUTED_PROPERTIES]
  /*
    code sample:
    const userDisplayName = user.firstName + user.lastName
  */

  // [USE_EFFECTS]

  // [TEMPLATE]
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <MaterialSimpleFormWithUpload />
      </Col>
      <Col span={24}>
        <MaterialSimpleList withDelete />
      </Col>
    </Row>
  )
}

// [PROPTYPES]
MaterialSimpleListWithUpload.propTypes = {
  props: PropTypes.object
}

export default MaterialSimpleListWithUpload
