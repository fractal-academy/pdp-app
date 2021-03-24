import PropTypes from 'prop-types'
import { useState } from 'react'
import { message, Modal, Form } from 'antd'
import _ from 'lodash'
import { getCollectionRef } from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { UserSimpleForm } from 'domains/User/components/forms'
/**
 * @info UserModalWithForm (23 Mar 2021) // CREATION DATE
 *
 * @comment UserModalWithForm - React component.
 *
 * @since 24 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const UserModalWithForm = (props) => {
  // [INTERFACES]
  const {
    isModalVisible,
    setIsModalVisible,
    avatarURL,
    title,
    ...restUserData
  } = props

  // [COMPONENT_STATE_HOOKS]
  const [avatarFormURL, setAvatarFormURL] = useState(avatarURL)
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [HELPER_FUNCTIONS]
  const onSubmit = (userData) => {
    setLoading(true)
    try {
      getCollectionRef(COLLECTIONS.USERS)
        .doc(restUserData.id)
        .set(
          { ..._.pickBy(userData, _.identity), avatarURL: avatarFormURL || '' },
          { merge: true }
        ) //deleted fields that are 'undefined'
      message.success('User was edited successful')
    } catch (error) {
      message.error(error.message)
    }
    setLoading(false)
    setIsModalVisible(false)
  }

  const onCancel = () => {
    setIsModalVisible(false)
  }

  // [TEMPLATE]
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={form.submit}
      onCancel={onCancel}>
      <UserSimpleForm
        form={form}
        setAvatarURL={setAvatarFormURL}
        avatarURL={avatarFormURL}
        onSubmit={onSubmit}
        loading={loading}
        {...restUserData}
      />
    </Modal>
  )
}

// [PROPTYPES]
UserModalWithForm.propTypes = {
  setIsModalVisible: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default UserModalWithForm
