import React from 'react'
import UserAdvancedView from './UserAdvancedView.template'

const metadata = {
  title: 'app/domains/User/components/views/UserAdvancedView',
  component: UserAdvancedView
}
export default metadata

export const UserAdvancedViewStory = (args) => (
  <UserAdvancedView
    avatarLeft
    firstName="Fractal"
    secondName="Band"
    email="fractal@gmail.com"
    avatarURL="https://firebasestorage.googleapis.com/v0/b/expenses-senseteq.appspot.com/o/photo_2020-11-27_19-32-45.jpg?alt=media&token=75958d4d-46ab-458f-b413-e81696c8c16d"
    {...args}
  />
)

UserAdvancedViewStory.args = {}
