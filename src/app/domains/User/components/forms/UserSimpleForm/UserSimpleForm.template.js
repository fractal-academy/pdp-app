import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form, Input, Button, Upload, Avatar, message } from 'antd'
import { Row, Col } from 'antd-styled'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import storage from '~/services/Firebase/storage'
import { ROLES } from '~/constants'
import { useRole } from 'contexts/Role/hooks'
import { useSession } from 'contexts/Session/hooks'
import { RoleSingleSelect } from 'domains/Role/components/selects'
import { CompanyMultipleSelect } from 'domains/Company/components/selects'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'

/**
 * @info UserSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleForm - React component.
 *
 * @since 29 Mar 2021 ( v.0.0.8 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const EDITING_FIELDS = [
  {
    name: 'firstName',
    placeholder: 'First name',
    rules: [
      {
        required: true,
        message: 'Please input your name'
      }
    ]
  },
  {
    name: 'secondName',
    placeholder: 'Second name',
    rules: [
      {
        required: true,
        message: 'Please input your surname'
      }
    ]
  },
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
    email,
    phone,
    role,
    companyIds,
    form,
    onSubmit
  } = props

  // [COMPONENT_STATE_HOOKS]
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [avatarFormURL, setAvatarFormURL] = useState(avatarURL)

  // [ADDITIONAL_HOOKS]
  const currentUserRole = useRole()
  const session = useSession()

  // [HELPER_FUNCTIONS]
  const onUploadAvatar = async (file) => {
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
            setAvatarFormURL(avatarURL)
            form.setFieldsValue({ avatarURL })
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
  const normFile = (e) => {
    console.log(e.file)
    return e.file
  }

  // [TEMPLATE]
  return (
    <Form
      name="userEdit"
      initialValues={{
        firstName,
        secondName,
        email,
        phone,
        role,
        companyIds,
        avatarURL
      }}
      form={form}
      onFinish={(values) =>
        onSubmit({ ...values, role: values.role ?? session.role })
      }>
      <Row justifyContent="center" mb={3}>
        <Col>
          <Avatar src={avatarFormURL} size={96} icon={<UserOutlined />} />
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col>
          <Form.Item name="avatarURL" getValueFromEvent={normFile}>
            <ImgCrop rotate>
              <Upload showUploadList={false} action={onUploadAvatar}>
                <Button icon={<UploadOutlined />} loading={loadingAvatar}>
                  Upload avatar
                </Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col span={15}>
          <Form.Item name="companyIds" initialValue={companyIds}>
            <CompanyMultipleSelect />
          </Form.Item>
        </Col>
      </Row>
      {currentUserRole.role === ROLES.ADMIN && (
        <Row justifyContent="center">
          <Col span={7}>
            <Form.Item name="role" initialValue={role}>
              <RoleSingleSelect />
            </Form.Item>
          </Col>
        </Row>
      )}
      {EDITING_FIELDS.map((field) => (
        <Form.Item key={field.name} name={field.name} rules={field.rules}>
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
  role: PropTypes.string.isRequired,
  companyIds: PropTypes.array,
  onSubmit: PropTypes.func.isRequired
}

export default UserSimpleForm
