import React from 'react'
import CompetenceSimpleList from './CompetenceSimpleList.template'

const metadata = {
  title: 'app/domains/Competence/components/lists/CompetenceSimpleList',
  component: CompetenceSimpleList
}
export default metadata

export const CompetenceSimpleListStory = (args) => (
  <CompetenceSimpleList
    data={[
      { competenceId: 'AXqMhPVZQawmlrPF2ZX4' },
      { competenceId: 'J6LP97iGQwmoStiG6VVE' },
      { competenceId: 'J6LP97iGQwmoStiG6VVE' }
    ]}
    {...args}
  />
)

CompetenceSimpleListStory.args = {}
