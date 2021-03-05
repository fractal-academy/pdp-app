import React from 'react'
import TechnologyListWithSelect from './TechnologyListWithSelect.template'

const metadata = {
  title:
    'app/domains/Technology/components/combined/lists/TechnologyListWithSelect',
  component: TechnologyListWithSelect
}
export default metadata

export const TechnologyListWithSelectStory = (args) => (
  <TechnologyListWithSelect {...args} />
)

TechnologyListWithSelectStory.args = {}
