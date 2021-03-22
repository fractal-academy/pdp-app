import React from 'react'
import MentorSimpleTable from './MentorSimpleTable.template'

const metadata = {
  title: 'app/domains/Mentor/components/tables/MentorSimpleTable',
  component: MentorSimpleTable
}

export default metadata

export const MentorSimpleTableStory = (args) => <MentorSimpleTable {...args} />

MentorSimpleTableStory.args = {}
