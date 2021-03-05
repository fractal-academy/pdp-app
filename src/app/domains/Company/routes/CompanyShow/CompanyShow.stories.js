import React from 'react'
import CompanyShow from './CompanyShow.layout'

const metadata = {
  title: 'app/domains/Company/routes/CompanyShow',
  component: CompanyShow
}
export default metadata

export const CompanyShowStory = (args) => <CompanyShow {...args} />

CompanyShowStory.args = {}
