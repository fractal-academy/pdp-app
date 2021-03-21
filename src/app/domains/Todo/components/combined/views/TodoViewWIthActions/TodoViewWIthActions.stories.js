import React from 'react'
import TodoViewWIthActions from './TodoViewWIthActions.template'

const metadata = {
  title: 'app/domains/Todo/components/combined/views/TodoViewWIthActions',
  component: TodoViewWIthActions
}
export default metadata

export const TodoViewWIthActionsStory = (args) => (
  <TodoViewWIthActions {...args} />
)

TodoViewWIthActionsStory.args = {}
