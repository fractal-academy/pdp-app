import React from 'react'
import CompetenceSimpleList from './CompetenceSimpleList.template'

const metadata = {
  title: 'app/domains/Competence/components/lists/CompetenceSimpleList',
  component: CompetenceSimpleList
}
export default metadata

export const CompetenceSimpleListStory = (args) => (
  <CompetenceSimpleList {...args} />
)

CompetenceSimpleListStory.args = {}
