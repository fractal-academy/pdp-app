import React from 'react'
import UserAdvancedTable from './UserAdvancedTable.template'

const metadata = {
  title: 'app/domains/User/components/tables/UserAdvancedTable',
  component: UserAdvancedTable
}
export default metadata

export const UserAdvancedTableStory = (args) => <UserAdvancedTable {...args} />

UserAdvancedTableStory.args = {}
