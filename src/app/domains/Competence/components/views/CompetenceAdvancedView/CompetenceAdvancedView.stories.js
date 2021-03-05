import React from 'react'
import CompetenceAdvancedView from './CompetenceAdvancedView.template'

const metadata = {
  title: 'app/domains/Competence/components/views/CompetenceAdvancedView',
  component: CompetenceAdvancedView
}
export default metadata

export const CompetenceAdvancedViewStory = (args) => (
  <CompetenceAdvancedView {...args} />
)

CompetenceAdvancedViewStory.args = {}
