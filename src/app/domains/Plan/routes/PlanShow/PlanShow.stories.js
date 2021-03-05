import React from 'react'
import PlanShow from './PlanShow.layout'

const metadata = {
  title: 'app/domains/Plan/routes/PlanShow',
  component: PlanShow
}
export default metadata

export const PlanShowStory = (args) => <PlanShow {...args} />

PlanShowStory.args = {}
