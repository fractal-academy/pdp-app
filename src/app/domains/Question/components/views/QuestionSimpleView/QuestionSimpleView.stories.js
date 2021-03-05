import React from 'react'
import QuestionSimpleView from './QuestionSimpleView.template'

const metadata = {
  title: 'app/domains/Question/components/views/QuestionSimpleView',
  component: QuestionSimpleView
}
export default metadata

export const QuestionSimpleViewStory = (args) => (
  <QuestionSimpleView {...args} />
)

QuestionSimpleViewStory.args = {}
