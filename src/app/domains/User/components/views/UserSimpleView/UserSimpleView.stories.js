import React from 'react'
import UserSimpleView from './UserSimpleView.template'

const metadata = {
  title: 'app/domains/User/components/views/UserSimpleView',
  component: UserSimpleView
}
export default metadata

export const UserSimpleViewStory = (args) => (
  <UserSimpleView
    firstName="Fractal"
    secondName="Band"
    email="fractal@gmail.com"
    avatarURL="https://firebasestorage.googleapis.com/v0/b/expenses-senseteq.appspot.com/o/photo_2020-11-27_19-32-45.jpg?alt=media&token=75958d4d-46ab-458f-b413-e81696c8c16d"
    {...args}
  />
)

UserSimpleViewStory.args = {}
