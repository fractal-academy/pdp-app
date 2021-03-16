import React from 'react'
import TechnologyAdvancedList from './TechnologyAdvancedList.template'

const metadata = {
  title: 'app/domains/Technology/components/lists/TechnologyAdvancedList',
  component: TechnologyAdvancedList
}
export default metadata

export const TechnologyAdvancedListStory = (args) => (
  <TechnologyAdvancedList {...args} />
)

TechnologyAdvancedListStory.args = {}
