import PropTypes from 'prop-types'
import { useState } from 'react'
import { message, Modal, Form } from 'antd'
import _ from 'lodash'
import {
  getCollectionRef,
  getDocumentRef,
  setDocument
} from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { UserSimpleForm } from 'domains/User/components/forms'
import { ROLES } from '~/constants'
/**
 * @info UserModalWithForm (23 Mar 2021) // CREATION DATE
 *
 * @comment UserModalWithForm - React component.
 *
 * @since 29 Mar 2021 ( v.0.1.3 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const UserModalWithForm = (props) => {
  // [INTERFACES]
  const { isModalVisible, setIsModalVisible, title, ...restUserData } = props

  // [COMPONENT_STATE_HOOKS]
  const [companyIds, setCompanyIds] = useState(restUserData.companyIds)
  const [loading, setLoading] = useState(false)
  const [loadingAvatar, setLoadingAvatar] = useState(false)

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [HELPER_FUNCTIONS]
  const onSubmit = async (fullUserData) => {
    setLoading(true)

    let mentorData = { mentorId: restUserData?.mentorId }

    if (restUserData.role !== fullUserData.role) {
      if (restUserData.role === ROLES.STUDENT) {
        const mentorId = getDocumentRef(COLLECTIONS.MENTORS).id
        await setDocument(COLLECTIONS.MENTORS, mentorId, {
          id: mentorId,
          userId: restUserData.id,
          isAdmin: fullUserData.role === ROLES.ADMIN
          /**
           * if role from edit form is admin,
           *  to mentor`s document will be set field isAdmin: true
           *  if role is mentor - isAdmin: false
           */
        })
        mentorData = { mentorId }
      } else if (fullUserData.role === ROLES.STUDENT) {
        /**
         *  if previous role is admin or mentor
         */
        delete mentorData.mentorId
      } else {
        /**
         * if previous role is admin or mentor,
         * and role from edit form is admin or mentor, too
         */
        await getCollectionRef(COLLECTIONS.MENTORS)
          .doc(restUserData.mentorId)
          .update({
            isAdmin: fullUserData.role === ROLES.ADMIN
          })
      }
    }

    const userData = {
      ...mentorData,
      id: restUserData.id,
      firstName: fullUserData?.firstName,
      secondName: fullUserData?.secondName,
      role: fullUserData.role,
      phone: fullUserData?.phone,
      email: fullUserData?.email,
      studentId: restUserData.studentId,
      avatarURL: fullUserData.avatarURL
    }

    try {
      await getCollectionRef(COLLECTIONS.USERS)
        .doc(restUserData.userId)
        .set({ ..._.pickBy(userData, _.identity) })

      fullUserData?.companyIds &&
        (await getCollectionRef(COLLECTIONS.STUDENTS)
          .doc(restUserData.studentId)
          .update({ companyIds: fullUserData.companyIds }))

      message.success('User was edited successful')
    } catch (error) {
      message.error(error.message)
    }

    setLoading(false)
    setIsModalVisible(false)

    localStorage.removeItem('editProfile')
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
      okButtonProps={{ loading, disabled: loadingAvatar }}
      onCancel={onCancel}
      cancelButtonProps={{ disabled: !!localStorage.getItem('editProfile') }}
      destroyOnClose
      closable={!!!localStorage.getItem('editProfile')}>
      <UserSimpleForm
        form={form}
        companyIds={companyIds}
        setCompanyIds={setCompanyIds}
        onSubmit={onSubmit}
        loadingAvatar={loadingAvatar}
        setLoadingAvatar={setLoadingAvatar}
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
