import React from 'react'
import PlanSimpleView from './PlanSimpleView.template'

const metadata = {
  title: 'app/domains/Plan/components/views/PlanSimpleView',
  component: PlanSimpleView
}
export default metadata

export const PlanSimpleViewStory = (args) => <PlanSimpleView {...args} />

PlanSimpleViewStory.args = {}
