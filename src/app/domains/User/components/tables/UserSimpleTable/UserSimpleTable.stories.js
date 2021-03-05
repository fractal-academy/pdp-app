import React from 'react'
import UserSimpleTable from './UserSimpleTable.template'

const metadata = {
  title: 'app/domains/User/components/tables/UserSimpleTable',
  component: UserSimpleTable
}
export default metadata

export const UserSimpleTableStory = (args) => <UserSimpleTable {...args} />

UserSimpleTableStory.args = {}
