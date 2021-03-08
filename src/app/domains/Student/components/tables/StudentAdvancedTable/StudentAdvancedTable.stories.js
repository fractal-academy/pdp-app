import React from 'react'
import StudentAdvancedTable from './StudentAdvancedTable.template'

const metadata = {
  title: 'app/domains/Student/components/tables/StudentAdvancedTable',
  component: StudentAdvancedTable
}
export default metadata

export const StudentAdvancedTableStory = (args) => (
  <StudentAdvancedTable {...args} />
)

StudentAdvancedTableStory.args = {}
