import React from 'react'
import QuestionViewWithForm from './QuestionViewWithForm.template'

const metadata = {
  title: 'app/domains/Question/components/combined/views/QuestionViewWithForm',
  component: QuestionViewWithForm
}
export default metadata

export const QuestionViewWithFormStory = (args) => (
  <QuestionViewWithForm {...args} />
)

QuestionViewWithFormStory.args = {}
