import React from 'react'
import ExpirienseSimpleView from './ExpirienseSimpleView.template'

const metadata = {
  title: 'app/domains/Expiriense/components/views/ExpirienseSimpleView',
  component: ExpirienseSimpleView
}
export default metadata

export const ExpirienseSimpleViewStory = (args) => (
  <ExpirienseSimpleView {...args} />
)

ExpirienseSimpleViewStory.args = {}
