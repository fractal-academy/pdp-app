import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form, Input, Button, Upload, Avatar, message } from 'antd'
import { Row, Col } from 'antd-styled'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import storage from '~/services/Firebase/storage'
import { ROLES } from '~/constants'
import { useRole } from 'contexts/Role/hooks'
import { RoleSingleSelect } from 'domains/Role/components/selects'

/**
 * @info UserSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleForm - React component.
 *
 * @since 24 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const EDITING_FIELDS = [
  { name: 'firstName', placeholder: 'First name' },
  { name: 'secondName', placeholder: 'Second name' },
  {
    name: 'email',
    placeholder: 'Email',
    rules: [
      {
        required: true,
        message: 'Please input your email'
      },
      { type: 'email', message: 'Input a valid email' }
    ]
  },
  { name: 'phone', placeholder: 'Phone' }
]

const UserSimpleForm = (props) => {
  // [INTERFACES]
  const {
    firstName,
    secondName,
    avatarURL,
    setAvatarURL,
    email,
    phone,
    role,
    onSubmit,
    onCancel,
    loading
  } = props

  // [COMPONENT_STATE_HOOKS]
  const [loadingAvatar, setLoadingAvatar] = useState(false)

  // [ADDITIONAL_HOOKS]
  const currentUserRole = useRole()

  // [HELPER_FUNCTIONS]
  const onUploadAvatar = async (data) => {
    const { file } = data
    setLoadingAvatar(true)
    try {
      const avatarRef = storage
        .ref()
        .child('users/' + file)
        .put(file)
      avatarRef.on(
        'state_changed',
        () => {},
        () => {},
        async () => {
          try {
            const avatarURL = await avatarRef.snapshot.ref.getDownloadURL()
            setAvatarURL(avatarURL)
          } catch (error) {
            console.log(error.message)
          }
          setLoadingAvatar(false)
        }
      )
    } catch (error) {
      message.error(error.message)
    }
  }

  // [TEMPLATE]
  return (
    <Form
      name="userEdit"
      initialValues={{ firstName, secondName, email, phone, role }}
      onFinish={onSubmit}>
      <Row justifyContent="center" mb={2}>
        <Col>
          <Avatar src={avatarURL} size={82} icon={<UserOutlined />} />
        </Col>
      </Row>
      <Form.Item name="avatarURL">
        <Row justifyContent="center">
          <Col>
            <ImgCrop rotate>
              <Upload showUploadList={false} customRequest={onUploadAvatar}>
                <Button icon={<UploadOutlined />} loading={loadingAvatar}>
                  Upload avatar
                </Button>
              </Upload>
            </ImgCrop>
          </Col>
        </Row>
      </Form.Item>
      {currentUserRole.role === ROLES.ADMIN && (
        <Form.Item name="role">
          <RoleSingleSelect />
        </Form.Item>
      )}
      {EDITING_FIELDS.map((field) => (
        <Form.Item name={field.name} rules={field.rules}>
          <Input placeholder={field.placeholder} />
        </Form.Item>
      ))}
      <Row justifyContent="flex-end">
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button onClick={onCancel}>Cancel</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

// [PROPTYPES]
UserSimpleForm.propTypes = {
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  avatarURL: PropTypes.string,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool.isRequired
}

export default UserSimpleForm
