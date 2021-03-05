import React from 'react'
import CompanyAll from './CompanyAll.layout'

const metadata = {
  title: 'app/domains/Company/routes/CompanyAll',
  component: CompanyAll
}
export default metadata

export const CompanyAllStory = (args) => <CompanyAll {...args} />

CompanyAllStory.args = {}
