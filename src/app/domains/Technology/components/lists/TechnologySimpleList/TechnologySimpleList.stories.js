import React from 'react'
import TechnologySimpleList from './TechnologySimpleList.template'

const metadata = {
  title: 'app/domains/Technology/components/lists/TechnologySimpleList',
  component: TechnologySimpleList
}
export default metadata
const data = [{ technologyId: 'LCpboRsqU6zvWYRirBOD', skillId: '789' }]
export const TechnologySimpleListStory = (args) => (
  <TechnologySimpleList data={data} {...args} />
)

TechnologySimpleListStory.args = {}
