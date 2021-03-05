import React from 'react'
import InterviewSimpleList from './InterviewSimpleList.template'

const metadata = {
  title: 'app/domains/Interview/components/lists/InterviewSimpleList',
  component: InterviewSimpleList
}
export default metadata

export const InterviewSimpleListStory = (args) => (
  <InterviewSimpleList {...args} />
)

InterviewSimpleListStory.args = {}
