import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'
/**
 * @info TodoSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleForm - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoSimpleForm = (props) => {
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
    <Form layout="inline" size="large">
      <Form.Item style={{ flex: 1 }}>
        <Input placeholder="Enter what student need to do..." />
      </Form.Item>
      <Form.Item noStyle>
        <Button htmlType="submit" type="primary">
          Add task
        </Button>
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
TodoSimpleForm.propTypes = {}

export default TodoSimpleForm
