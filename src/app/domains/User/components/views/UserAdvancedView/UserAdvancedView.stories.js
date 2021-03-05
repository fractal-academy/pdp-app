import React from 'react'
import UserAdvancedView from './UserAdvancedView.template'

const metadata = {
  title: 'app/domains/User/components/views/UserAdvancedView',
  component: UserAdvancedView
}
export default metadata

export const UserAdvancedViewStory = (args) => <UserAdvancedView {...args} />

UserAdvancedViewStory.args = {}
