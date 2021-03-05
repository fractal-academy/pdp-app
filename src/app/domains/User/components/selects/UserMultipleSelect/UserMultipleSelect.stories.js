import React from 'react'
import UserMultipleSelect from './UserMultipleSelect.template'

const metadata = {
  title: 'app/domains/User/components/selects/UserMultipleSelect',
  component: UserMultipleSelect
}
export default metadata

export const UserMultipleSelectStory = (args) => (
  <UserMultipleSelect {...args} />
)

UserMultipleSelectStory.args = {}
