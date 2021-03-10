import React from 'react'
import MaterialSimpleForm from './MaterialSimpleForm.template'

const metadata = {
  title: 'app/domains/Material/components/forms/MaterialSimpleForm',
  component: MaterialSimpleForm
}
export default metadata

export const MaterialSimpleFormStory = (args) => (
  <MaterialSimpleForm {...args} />
)

MaterialSimpleFormStory.args = {}
