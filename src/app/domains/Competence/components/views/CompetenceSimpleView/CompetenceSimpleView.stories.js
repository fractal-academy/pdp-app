import React from 'react'
import CompetenceSimpleView from './CompetenceSimpleView.template'

const metadata = {
  title: 'app/domains/Competence/components/views/CompetenceSimpleView',
  component: CompetenceSimpleView
}
export default metadata

export const CompetenceSimpleViewStory = (args) => (
  <CompetenceSimpleView name="WebDev" {...args} />
)

CompetenceSimpleViewStory.args = {}
