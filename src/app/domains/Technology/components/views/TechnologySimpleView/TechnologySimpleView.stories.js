import React from 'react'
import TechnologySimpleView from './TechnologySimpleView.template'

const metadata = {
  title: 'app/domains/Technology/components/views/TechnologySimpleView',
  component: TechnologySimpleView
}
export default metadata

export const TechnologySimpleViewStory = (args) => (
  <TechnologySimpleView
    technologyId="boGRir9DiSNxCIuBeBNi"
    withHashTag
    {...args}
  />
)

TechnologySimpleViewStory.args = {}
