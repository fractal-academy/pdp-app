import React from 'react'
import TodoSimpleForm from './TodoSimpleForm.template'

const metadata = {
  title: 'app/domains/Todo/components/forms/TodoSimpleForm',
  component: TodoSimpleForm
}
export default metadata

export const TodoSimpleFormStory = (args) => <TodoSimpleForm {...args} />

TodoSimpleFormStory.args = {}
