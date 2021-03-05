import React from 'react'
import UserSimpleForm from './UserSimpleForm.template'

const metadata = {
  title: 'app/domains/User/components/forms/UserSimpleForm',
  component: UserSimpleForm
}
export default metadata

export const UserSimpleFormStory = (args) => <UserSimpleForm {...args} />

UserSimpleFormStory.args = {}
