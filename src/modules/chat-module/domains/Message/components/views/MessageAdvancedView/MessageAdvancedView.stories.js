import React from 'react'
import MessageAdvancedView from './MessageAdvancedView.template'

const metadata = {
  title:
    'modules/chat-module/domains/Message/components/views/MessageAdvancedView',
  component: MessageAdvancedView
}
export default metadata

export const MessageAdvancedViewStory = (args) => (
  <MessageAdvancedView {...args} />
)

MessageAdvancedViewStory.args = {}
