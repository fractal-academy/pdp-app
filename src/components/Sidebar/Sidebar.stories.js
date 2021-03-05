import React from 'react'
import Sidebar from './Sidebar.template'

const metadata = {
  title: 'components/Sidebar',
  component: Sidebar
}
export default metadata

export const SidebarStory = (args) => <Sidebar {...args} />

SidebarStory.args = {}
