import React from 'react'
import MaterialSimpleList from './MaterialSimpleList.template'

const metadata = {
  title: 'app/domains/Material/components/lists/MaterialSimpleList',
  component: MaterialSimpleList
}
export default metadata

export const MaterialSimpleListStory = (args) => (
  <MaterialSimpleList {...args} />
)

MaterialSimpleListStory.args = {}
