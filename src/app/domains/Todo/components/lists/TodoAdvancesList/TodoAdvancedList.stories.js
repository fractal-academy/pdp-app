import React from 'react'
import TodoAdvancedList from './TodoAdvancedList.template'

const metadata = {
  title: 'app/domains/Todo/components/lists/TodoAdvancedList',
  component: TodoAdvancedList
}
export default metadata

export const TodoAdvancedListStory = (args) => <TodoAdvancedList {...args} />

TodoAdvancedListStory.args = {}
