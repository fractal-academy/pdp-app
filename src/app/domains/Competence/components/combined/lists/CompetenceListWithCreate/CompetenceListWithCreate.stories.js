import React from 'react'
import CompetenceListWithCreate from './CompetenceListWithCreate.template'

const metadata = {
  title:
    'app/domains/Competence/components/combined/lists/CompetenceListWithCreate',
  component: CompetenceListWithCreate
}
export default metadata

export const CompetenceListWithCreateStory = (args) => (
  <CompetenceListWithCreate {...args} />
)

CompetenceListWithCreateStory.args = {}
