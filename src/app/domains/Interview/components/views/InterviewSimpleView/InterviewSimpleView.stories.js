import React from 'react'
import InterviewSimpleView from './InterviewSimpleView.template'

const metadata = {
  title: 'app/domains/Interview/components/views/InterviewSimpleView',
  component: InterviewSimpleView
}
export default metadata

export const InterviewSimpleViewStory = (args) => (
  <InterviewSimpleView {...args} />
)

InterviewSimpleViewStory.args = {}
