import React from 'react'
import SpecialityAdvancedForm from './SpecialityAdvancedForm.template'

const metadata = {
  title: 'app/domains/Speciality/components/forms/SpecialityAdvancedForm',
  component: SpecialityAdvancedForm
}
export default metadata

export const SpecialityAdvancedFormStory = (args) => (
  <SpecialityAdvancedForm {...args} />
)

SpecialityAdvancedFormStory.args = {}
