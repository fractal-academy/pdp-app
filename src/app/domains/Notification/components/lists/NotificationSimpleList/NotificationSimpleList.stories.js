import React from 'react'
import NotificationSimpleList from './NotificationSimpleList.template'

const metadata = {
  title: 'app/domains/Notification/components/lists/NotificationSimpleList',
  component: NotificationSimpleList
}
export default metadata

export const NotificationSimpleListStory = (args) => (
  <NotificationSimpleList {...args} />
)

NotificationSimpleListStory.args = {}
