import PropTypes from 'prop-types'
import { Form, Input, Button, Space, message } from 'antd'
import { Box } from 'antd-styled'
import TYPES from '~/app/contexts/Session/types'
import { useHistory } from 'react-router-dom'
import auth from '~/services/Firebase/auth'
import firestore from '~/services/Firebase/firestore'
import { ROLES } from '~/constants'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSessionDispatch, useSession } from 'contexts/Session/hooks'
import { useRole } from 'contexts/Role/hooks'

/**
 * @info SessionSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment SessionSimpleForm - React component.
 *
 * @since 18 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SessionSimpleForm = (props) => {
  // [INTERFACES]
  const { register } = props
  const refCollectionUsers = firestore.collection(COLLECTIONS.USERS)

  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const session = useSession()
  const [form] = Form.useForm()
  const { setRole } = useRole()
  const sessionDispatch = useSessionDispatch()

  // [COMPONENT_STATE_HOOKS]
  /*
  code sample:
  const singleton = useRef(true) // references also put here
  const [state, setState] = useState({})
  */

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
        await auth.signInWithEmailAndPassword(values.email, values.password)
      } catch (error) {
        console.log('error message', error.message)
      }
    }
  }
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
            <Button type="primary" htmlType="submit" loading={session.loading}>
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
