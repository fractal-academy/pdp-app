import React from 'react'
import TodoSimpleView from './TodoSimpleView.template'

const metadata = {
  title: 'app/domains/Todo/components/views/TodoSimpleView',
  component: TodoSimpleView
}
export default metadata

export const TodoSimpleViewStory = (args) => <TodoSimpleView {...args} />

TodoSimpleViewStory.args = {}
