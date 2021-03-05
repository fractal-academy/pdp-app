import React from 'react'
import SpecialitySimpleView from './SpecialitySimpleView.template'

const metadata = {
  title: 'app/domains/Speciality/components/views/SpecialitySimpleView',
  component: SpecialitySimpleView
}
export default metadata

export const SpecialitySimpleViewStory = (args) => (
  <SpecialitySimpleView {...args} />
)

SpecialitySimpleViewStory.args = {}
