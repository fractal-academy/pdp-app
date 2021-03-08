import React from 'react'
import StudentSimpleTable from './StudentSimpleTable.template'

const metadata = {
  title: 'app/domains/Student/components/tables/StudentSimpleTable',
  component: StudentSimpleTable
}
export default metadata

export const StudentSimpleTableStory = (args) => (
  <StudentSimpleTable {...args} />
)

StudentSimpleTableStory.args = {}
