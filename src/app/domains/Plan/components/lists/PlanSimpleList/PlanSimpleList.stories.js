import React from 'react'
import PlanSimpleList from './PlanSimpleList.template'

const metadata = {
  title: 'app/domains/Plan/components/lists/PlanSimpleList',
  component: PlanSimpleList
}
export default metadata

export const PlanSimpleListStory = (args) => <PlanSimpleList {...args} />

PlanSimpleListStory.args = {}
