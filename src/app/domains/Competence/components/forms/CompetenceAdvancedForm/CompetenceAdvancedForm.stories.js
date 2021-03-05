import React from 'react'
import CompetenceAdvancedForm from './CompetenceAdvancedForm.template'

const metadata = {
  title: 'app/domains/Competence/components/forms/CompetenceAdvancedForm',
  component: CompetenceAdvancedForm
}
export default metadata

export const CompetenceAdvancedFormStory = (args) => (
  <CompetenceAdvancedForm {...args} />
)

CompetenceAdvancedFormStory.args = {}
