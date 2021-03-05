import React from 'react'
import TechnologyAdvancedForm from './TechnologyAdvancedForm.template'

const metadata = {
  title: 'app/domains/Technology/components/forms/TechnologyAdvancedForm',
  component: TechnologyAdvancedForm
}
export default metadata

export const TechnologyAdvancedFormStory = (args) => (
  <TechnologyAdvancedForm {...args} />
)

TechnologyAdvancedFormStory.args = {}
