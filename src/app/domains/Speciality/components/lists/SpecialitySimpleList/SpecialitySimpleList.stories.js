import React from 'react'
import SpecialitySimpleList from './SpecialitySimpleList.template'

const metadata = {
  title: 'app/domains/Speciality/components/lists/SpecialitySimpleList',
  component: SpecialitySimpleList
}
export default metadata

export const SpecialitySimpleListStory = (args) => (
  <SpecialitySimpleList {...args} />
)

SpecialitySimpleListStory.args = {}
