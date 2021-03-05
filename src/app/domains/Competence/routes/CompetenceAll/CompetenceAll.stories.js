import React from 'react'
import CompetenceAll from './CompetenceAll.layout'

const metadata = {
  title: 'app/domains/Competence/routes/CompetenceAll',
  component: CompetenceAll
}
export default metadata

export const CompetenceAllStory = (args) => <CompetenceAll {...args} />

CompetenceAllStory.args = {}
