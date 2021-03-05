import React from 'react'
import TodoCreate from './TodoCreate.layout'

const metadata = {
  title: 'app/domains/Todo/routes/TodoCreate',
  component: TodoCreate
}
export default metadata

export const TodoCreateStory = (args) => <TodoCreate {...args} />

TodoCreateStory.args = {}
