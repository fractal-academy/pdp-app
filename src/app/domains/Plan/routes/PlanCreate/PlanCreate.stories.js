import React from 'react'
import PlanCreate from './PlanCreate.layout'

const metadata = {
  title: 'app/domains/Plan/routes/PlanCreate',
  component: PlanCreate
}
export default metadata

export const PlanCreateStory = (args) => <PlanCreate {...args} />

PlanCreateStory.args = {}
