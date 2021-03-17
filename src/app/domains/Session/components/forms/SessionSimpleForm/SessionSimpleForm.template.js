import PropTypes from 'prop-types'
import { Form, Input, Button, Space } from 'antd'
import { Box } from 'antd-styled'

/**
 * @info SessionSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment SessionSimpleForm - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SessionSimpleForm = (props) => {
  // [INTERFACES]
  const { register } = props

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  /*
  code sample:
  const singleton = useRef(true) // references also put here
  const [state, setState] = useState({})
  */

  // [HELPER_FUNCTIONS]
  const onFinish = (values) => {}
  const onReset = () => {
    form.resetFields()
  }
  // [COMPUTED_PROPERTIES]
  /* 
    code sample: 
    const userDisplayName = user.firstName + user.lastName
  */

  // [USE_EFFECTS]

  // [TEMPLATE]
  return (
    <Form size="large" onFinish={onFinish} form={form}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email' }]}>
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'Please input your password' }]}>
        <Input.Password placeholder="Enter password" />
      </Form.Item>
      {register && (
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                )
              }
            })
          ]}>
          <Input.Password placeholder="Enter password again" />
        </Form.Item>
      )}
      <Form.Item>
        <Box display="flex" justifyContent="center">
          <Space size="large">
            <Button type="primary" htmlType="submit">
              {register ? 'Sign in' : 'Log in'}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Box>
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
SessionSimpleForm.propTypes = {
  register: PropTypes.bool
}

export default SessionSimpleForm
