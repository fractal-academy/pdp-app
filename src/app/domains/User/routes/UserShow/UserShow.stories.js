import React from 'react'
import UserShow from './UserShow.layout'

const metadata = {
  title: 'app/domains/User/routes/UserShow',
  component: UserShow
}
export default metadata

export const UserShowStory = (args) => <UserShow {...args} />

UserShowStory.args = {}
