import React from 'react'
import UserAdvancedList from './UserAdvancedList.template'

const metadata = {
  title: 'app/domains/User/components/lists/UserAdvancedList',
  component: UserAdvancedList
}
export default metadata

export const UserAdvancedListStory = (args) => <UserAdvancedList {...args} />

UserAdvancedListStory.args = {}
