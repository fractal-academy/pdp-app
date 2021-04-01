import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Space, message } from 'antd'
import { Box } from 'antd-styled'
import { useSessionDispatch } from 'contexts/Session/hooks'
import TYPES from 'contexts/Session/types'
import auth from '~/services/Firebase/auth'
import { ROUTE_PATHS } from 'app/constants'

/**
 * @info SessionSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment SessionSimpleForm - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SessionSimpleForm = (props) => {
  // [INTERFACES]
  const { register } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const [form] = Form.useForm()
  const sessionDispatch = useSessionDispatch()

  // [HELPER_FUNCTIONS]
  const onFinish = async (values) => {
    sessionDispatch({ type: TYPES.LOADING, payload: true })
    if (register) {
      try {
        localStorage.setItem('isNewUser', true)
        await auth.createUserWithEmailAndPassword(values.email, values.password)
      } catch (error) {
        message.error(error.message)
        if (error.code === 'auth/email-already-in-use') {
          history.push(ROUTE_PATHS.SESSION_LOGIN)
        }
      }
    } else {
      try {
        localStorage.setItem('signIn', true)
        await auth.signInWithEmailAndPassword(values.email, values.password)
      } catch (error) {
        message.error(error.message)
        onReset()
      }
    }
  }
  const onReset = () => {
    form.resetFields()
  }

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
              {register ? 'Sign up' : 'Log in'}
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
