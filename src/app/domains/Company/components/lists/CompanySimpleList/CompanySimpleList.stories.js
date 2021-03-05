import React from 'react'
import CompanySimpleList from './CompanySimpleList.template'

const metadata = {
  title: 'app/domains/Company/components/lists/CompanySimpleList',
  component: CompanySimpleList
}
export default metadata

export const CompanySimpleListStory = (args) => <CompanySimpleList {...args} />

CompanySimpleListStory.args = {}
