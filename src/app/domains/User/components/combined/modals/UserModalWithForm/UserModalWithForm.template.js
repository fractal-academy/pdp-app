import PropTypes from 'prop-types'
import { useState } from 'react'
import { message, Modal } from 'antd'
import _ from 'lodash'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { UserSimpleForm } from 'domains/User/components/forms'
/**
 * @info UserModalWithForm (23 Mar 2021) // CREATION DATE
 *
 * @comment UserModalWithForm - React component.
 *
 * @since 24 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const UserModalWithForm = (props) => {
  // [INTERFACES]
  const {
    isModalVisible,
    setIsModalVisible,
    avatarURL,
    ...restUserData
  } = props

  // [COMPONENT_STATE_HOOKS]
  const [avatarFormURL, setAvatarFormURL] = useState(avatarURL)
  const [loading, setLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const onSubmit = (userData) => {
    setLoading(true)
    try {
      firestore
        .collection(COLLECTIONS.USERS)
        .doc(restUserData.id)
        .set(
          { ..._.pickBy(userData, _.identity), avatarURL: avatarFormURL },
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
    <Modal title="Edit profile" visible={isModalVisible} footer={null}>
      <UserSimpleForm
        setAvatarURL={setAvatarFormURL}
        avatarURL={avatarFormURL}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
        {...restUserData}
      />
    </Modal>
  )
}

// [PROPTYPES]
UserModalWithForm.propTypes = {
  setIsModalVisible: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired
}

export default UserModalWithForm
