import React from 'react'
import UserSimpleView from './UserSimpleView.template'

const metadata = {
  title: 'app/domains/User/components/views/UserSimpleView',
  component: UserSimpleView
}
export default metadata

export const UserSimpleViewStory = (args) => <UserSimpleView {...args} />

UserSimpleViewStory.args = {}
