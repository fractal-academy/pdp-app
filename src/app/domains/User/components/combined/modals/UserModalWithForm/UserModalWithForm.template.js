import PropTypes from 'prop-types'
import { useState } from 'react'
import { message, Modal, Form } from 'antd'
import _ from 'lodash'
import {
  getCollectionRef,
  getDocumentRef,
  setDocument,
  deleteDocument
} from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { UserSimpleForm } from 'domains/User/components/forms'
import { ROLES } from '~/constants'
/**
 * @info UserModalWithForm (23 Mar 2021) // CREATION DATE
 *
 * @comment UserModalWithForm - React component.
 *
 * @since 26 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
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
  const [roleSelect, setRoleSelect] = useState(restUserData.role)
  const [companyIds, setCompanyIds] = useState(restUserData.companyIds)
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [HELPER_FUNCTIONS]
  const onSubmit = async (userData) => {
    setLoading(true)

    if (restUserData.role !== ROLES.MENTOR && roleSelect === ROLES.MENTOR) {
      const mentorId = getDocumentRef(COLLECTIONS.MENTORS).id

      await setDocument(COLLECTIONS.MENTORS, mentorId, {
        id: mentorId,
        userId: restUserData.id
      })
      userData = { ...userData, mentorId: mentorId }
    }
    if (restUserData.role === ROLES.MENTOR && roleSelect === ROLES.STUDENT) {
      await deleteDocument(COLLECTIONS.MENTORS, restUserData.mentorId)
      console.log(userData)
      delete userData.mentorId
    }

    try {
      await getCollectionRef(COLLECTIONS.USERS)
        .doc(restUserData.userId)
        .set({
          ..._.pickBy(userData, _.identity),
          avatarURL: avatarFormURL || '',
          studentId: restUserData.studentId,
          id: restUserData.id
        }) //deleted fields that are 'undefined'

      companyIds &&
        (await getCollectionRef(COLLECTIONS.STUDENTS)
          .doc(restUserData.studentId)
          .update({
            companyIds
          }))
      message.success('User was edited successful')
    } catch (error) {
      message.error(error.message)
    }
    setLoading(false)
    setIsModalVisible(false)
  }

  const onCancel = () => {
    setIsModalVisible(false)
    form.setFieldsValue(restUserData)
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
        roleSelect={roleSelect}
        companyIds={companyIds}
        setCompanyIds={setCompanyIds}
        setRoleSelect={setRoleSelect}
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
  title: PropTypes.string.isRequired,
  avatarURL: PropTypes.string
}

export default UserModalWithForm
