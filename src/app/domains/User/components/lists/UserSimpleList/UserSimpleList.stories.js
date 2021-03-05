import React from 'react'
import UserSimpleList from './UserSimpleList.template'

const metadata = {
  title: 'app/domains/User/components/lists/UserSimpleList',
  component: UserSimpleList
}
export default metadata

export const UserSimpleListStory = (args) => <UserSimpleList {...args} />

UserSimpleListStory.args = {}
