import React from 'react'
import CompanySimpleView from './CompanySimpleView.template'

const metadata = {
  title: 'app/domains/Company/components/views/CompanySimpleView',
  component: CompanySimpleView
}
export default metadata

export const CompanySimpleViewStory = (args) => (
  <CompanySimpleView name="Senseteq" {...args} />
)

CompanySimpleViewStory.args = {}
