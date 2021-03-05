import React from 'react'
import TodoSimpleList from './TodoSimpleList.template'

const metadata = {
  title: 'app/domains/Todo/components/lists/TodoSimpleList',
  component: TodoSimpleList
}
export default metadata

export const TodoSimpleListStory = (args) => <TodoSimpleList {...args} />

TodoSimpleListStory.args = {}
