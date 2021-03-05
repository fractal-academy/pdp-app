import React from 'react'
import TodoViews from './TodoViews.template'

const metadata = {
  title: 'app/domains/Todo/components/combined/TodoViews',
  component: TodoViews
}
export default metadata

export const TodoViewsStory = (args) => <TodoViews {...args} />

TodoViewsStory.args = {}
