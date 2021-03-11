import React from 'react'
import InterviewSimpleForm from './InterviewSimpleForm.template'

const metadata = {
  title: 'app/domains/Interview/components/forms/InterviewSimpleForm',
  component: InterviewSimpleForm
}
export default metadata

export const InterviewSimpleFormStory = (args) => (
  <InterviewSimpleForm {...args} />
)

InterviewSimpleFormStory.args = {}
