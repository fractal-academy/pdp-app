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
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'

/**
 * @info UserSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleForm - React component.
 *
 * @since 24 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
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
const STORAGE_URL = 'users/'

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
    form,
    onSubmit
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
      const MY_NAMESPACE = uuidv4()
      const avatarRef = storage
        .ref()
        .child(STORAGE_URL + uuidv5(file.name, MY_NAMESPACE))
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
      form={form}
      onFinish={onSubmit}>
      <Row justifyContent="center" mb={3}>
        <Col>
          <Avatar src={avatarURL} size={96} icon={<UserOutlined />} />
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
          <Row justifyContent="center">
            <Col span={7}>
              <RoleSingleSelect role={role} />
            </Col>
          </Row>
        </Form.Item>
      )}
      {EDITING_FIELDS.map((field) => (
        <Form.Item name={field.name} rules={field.rules}>
          <Input placeholder={field.placeholder} />
        </Form.Item>
      ))}
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
  onSubmit: PropTypes.func.isRequired
}

export default UserSimpleForm
