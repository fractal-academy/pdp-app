import React from 'react'
import CompetenceEdit from './CompetenceEdit.layout'

const metadata = {
  title: 'app/domains/Competence/routes/CompetenceEdit',
  component: CompetenceEdit
}
export default metadata

export const CompetenceEditStory = (args) => <CompetenceEdit {...args} />

CompetenceEditStory.args = {}
