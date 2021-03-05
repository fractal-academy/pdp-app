import React from 'react'
import UserAll from './UserAll.layout'

const metadata = {
  title: 'app/domains/User/routes/UserAll',
  component: UserAll
}
export default metadata

export const UserAllStory = (args) => <UserAll {...args} />

UserAllStory.args = {}
