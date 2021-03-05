import React from 'react'
import ChatShow from './ChatShow.layout'

const metadata = {
  title: 'modules/chat-module/domains/Chat/routes/ChatShow',
  component: ChatShow
}
export default metadata

export const ChatShowStory = (args) => <ChatShow {...args} />

ChatShowStory.args = {}
