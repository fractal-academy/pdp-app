import React from 'react'
import QuestionSimpleForm from './QuestionSimpleForm.template'

const metadata = {
  title: 'app/domains/Question/components/forms/QuestionSimpleForm',
  component: QuestionSimpleForm
}
export default metadata

export const QuestionSimpleFormStory = (args) => (
  <QuestionSimpleForm {...args} />
)

QuestionSimpleFormStory.args = {}
