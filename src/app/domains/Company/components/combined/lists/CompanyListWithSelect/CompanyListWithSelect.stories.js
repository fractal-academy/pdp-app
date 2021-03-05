import React from 'react'
import CompanyListWithSelect from './CompanyListWithSelect.template'

const metadata = {
  title: 'app/domains/Company/components/combined/lists/CompanyListWithSelect',
  component: CompanyListWithSelect
}
export default metadata

export const CompanyListWithSelectStory = (args) => (
  <CompanyListWithSelect {...args} />
)

CompanyListWithSelectStory.args = {}
