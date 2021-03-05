import React from 'react'
import InterviewAdvancedView from './InterviewAdvancedView.template'

const metadata = {
  title: 'app/domains/Interview/components/views/InterviewAdvancedView',
  component: InterviewAdvancedView
}
export default metadata

export const InterviewAdvancedViewStory = (args) => (
  <InterviewAdvancedView {...args} />
)

InterviewAdvancedViewStory.args = {}
