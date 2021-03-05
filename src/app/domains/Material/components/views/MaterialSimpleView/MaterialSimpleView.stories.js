import React from 'react'
import MaterialSimpleView from './MaterialSimpleView.template'

const metadata = {
  title: 'app/domains/Material/components/views/MaterialSimpleView',
  component: MaterialSimpleView
}
export default metadata

export const MaterialSimpleViewStory = (args) => (
  <MaterialSimpleView {...args} />
)

MaterialSimpleViewStory.args = {}
