import React from 'react'
import CompetenceShow from './CompetenceShow.layout'

const metadata = {
  title: 'app/domains/Competence/routes/CompetenceShow',
  component: CompetenceShow
}
export default metadata

export const CompetenceShowStory = (args) => <CompetenceShow {...args} />

CompetenceShowStory.args = {}
