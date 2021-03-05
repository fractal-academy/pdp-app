import React from 'react'
import TechnologySimpleList from './TechnologySimpleList.template'

const metadata = {
  title: 'app/domains/Technology/components/lists/TechnologySimpleList',
  component: TechnologySimpleList
}
export default metadata

export const TechnologySimpleListStory = (args) => (
  <TechnologySimpleList {...args} />
)

TechnologySimpleListStory.args = {}
