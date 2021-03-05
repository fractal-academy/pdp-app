import React from 'react'
import PlanAll from './PlanAll.layout'

const metadata = {
  title: 'app/domains/Plan/routes/PlanAll',
  component: PlanAll
}
export default metadata

export const PlanAllStory = (args) => <PlanAll {...args} />

PlanAllStory.args = {}
