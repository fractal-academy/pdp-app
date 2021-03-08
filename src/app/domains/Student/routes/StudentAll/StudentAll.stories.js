import React from 'react'
import StudentAll from './StudentAll.layout'

const metadata = {
  title: 'app/domains/Student/routes/StudentAll',
  component: StudentAll
}
export default metadata

export const StudentAllStory = (args) => <StudentAll {...args} />

StudentAllStory.args = {}
