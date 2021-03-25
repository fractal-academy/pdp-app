import React from 'react'
import CompanyMultipleSelect from './CompanyMultipleSelect.template'

const metadata = {
  title: 'app/domains/Company/components/selects/CompanyMultipleSelect',
  component: CompanyMultipleSelect
}
export default metadata

export const CompanyMultipleSelectStory = (args) => (
  <CompanyMultipleSelect {...args} />
)

CompanyMultipleSelectStory.args = {}
