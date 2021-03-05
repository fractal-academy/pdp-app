import React from 'react'
import TechnologyAdvancedView from './TechnologyAdvancedView.template'

const metadata = {
  title: 'app/domains/Technology/components/views/TechnologyAdvancedView',
  component: TechnologyAdvancedView
}
export default metadata

export const TechnologyAdvancedViewStory = (args) => (
  <TechnologyAdvancedView {...args} />
)

TechnologyAdvancedViewStory.args = {}
