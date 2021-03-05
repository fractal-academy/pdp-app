import React from 'react'
import CompanySingleSelect from './CompanySingleSelect.template'

const metadata = {
  title: 'app/domains/Company/components/selects/CompanySingleSelect',
  component: CompanySingleSelect
}
export default metadata

export const CompanySingleSelectStory = (args) => (
  <CompanySingleSelect {...args} />
)

CompanySingleSelectStory.args = {}
