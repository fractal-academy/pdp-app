import React from 'react'
import TechnologyAdvancedWithForm from './TechnologyAdvancedWithForm.template'

const metadata = {
  title:
    'app/domains/Technology/components/combined/views/TechnologyAdvancedWithForm',
  component: TechnologyAdvancedWithForm
}
export default metadata

export const TechnologyAdvancedWithFormStory = (args) => (
  <TechnologyAdvancedWithForm {...args} />
)

TechnologyAdvancedWithFormStory.args = {}
