import React from 'react'
import NotificationAdvancedView from './NotificationAdvancedView.template'

const metadata = {
  title: 'app/domains/Notification/components/views/NotificationAdvancedView',
  component: NotificationAdvancedView
}
export default metadata

export const NotificationAdvancedViewStory = (args) => (
  <NotificationAdvancedView {...args} />
)

NotificationAdvancedViewStory.args = {}
