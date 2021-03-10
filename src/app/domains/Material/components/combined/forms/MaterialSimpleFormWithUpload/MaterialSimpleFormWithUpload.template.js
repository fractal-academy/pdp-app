import PropTypes from 'prop-types'
import { Divider } from 'antd'
import { MaterialSimpleUpload } from 'domains/Material/components/combined/uploads'
import { MaterialSimpleForm } from 'domains/Material/components/forms'

/**
 * @info MaterialSimpleFormWithUpload (10 Mar 2021) // CREATION DATE
 *
 * @comment MaterialSimpleFormWithUpload - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MaterialSimpleFormWithUpload = (props) => {
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
    <>
      <MaterialSimpleUpload />
      <Divider>Or</Divider>
      <MaterialSimpleForm />
    </>
  )
}

// [PROPTYPES]
MaterialSimpleFormWithUpload.propTypes = {
  props: PropTypes.object
}

export default MaterialSimpleFormWithUpload
