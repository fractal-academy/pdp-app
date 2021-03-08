import React from 'react'
import TechnologySimpleList from './TechnologySimpleList.template'

const metadata = {
  title: 'app/domains/Technology/components/lists/TechnologySimpleList',
  component: TechnologySimpleList
}
export default metadata
const data = [
  { technologyId: 'boGRir9DiSNxCIuBeBNi', skillId: '789' },
  { technologyId: 'D5MeBdtiMGLHB6svJSs9', skillId: '789' },
  { technologyId: 'XgNXGIY5Xo1pKJaUusNr', skillId: '789' },
  { technologyId: 'zi4sSBkfJZs1wlLOOPpJ', skillId: '789' }
]
export const TechnologySimpleListStory = (args) => (
  <TechnologySimpleList data={data} {...args} />
)

TechnologySimpleListStory.args = {}
