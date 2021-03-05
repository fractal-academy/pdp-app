import React from 'react'
import Navigation from './Navigation.template'

const metadata = {
  title: 'components/Navigation',
  component: Navigation
}
export default metadata

export const NavigationStory = (args) => <Navigation {...args} />

NavigationStory.args = {}
