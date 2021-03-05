import React from 'react'
import ChatAll from './ChatAll.layout'

const metadata = {
  title: 'modules/chat-module/domains/Chat/routes/ChatAll',
  component: ChatAll
}
export default metadata

export const ChatAllStory = (args) => <ChatAll {...args} />

ChatAllStory.args = {}
