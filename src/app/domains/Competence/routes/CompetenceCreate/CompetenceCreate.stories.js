import React from 'react'
import CompetenceCreate from './CompetenceCreate.layout'

const metadata = {
  title: 'app/domains/Competence/routes/CompetenceCreate',
  component: CompetenceCreate
}
export default metadata

export const CompetenceCreateStory = (args) => <CompetenceCreate {...args} />

CompetenceCreateStory.args = {}
