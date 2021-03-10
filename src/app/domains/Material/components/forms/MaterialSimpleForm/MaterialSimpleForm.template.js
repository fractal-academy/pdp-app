import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
/**
 * @info MaterialSimpleForm (10 Mar 2021) // CREATION DATE
 *
 * @comment MaterialSimpleForm - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MaterialSimpleForm = (props) => {
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

  const onFinish = (data) => {
    console.log(data)
  }
  const onFinishFailed = (data) => {
    console.log(data)
  }

  // [COMPUTED_PROPERTIES]
  /*
    code sample:
    const userDisplayName = user.firstName + user.lastName
  */

  // [USE_EFFECTS]

  // [TEMPLATE]
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="inline"
      size="large">
      <Form.Item
        style={{ flex: 1 }}
        name="materialLink"
        rules={[
          { required: true, message: 'First enter link to material.' },
          { type: 'url', message: 'You can enter only links here.' }
        ]}>
        <Input placeholder="Enter link to material..." />
      </Form.Item>
      <Form.Item noStyle>
        <Button htmlType="submit" type="primary">
          Add Link
        </Button>
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
MaterialSimpleForm.propTypes = {
  props: PropTypes.object
}

export default MaterialSimpleForm
