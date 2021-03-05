import React from 'react'
import ProjectAdvancedView from './ProjectAdvancedView.template'

const metadata = {
  title: 'app/domains/Project/components/views/ProjectAdvancedView',
  component: ProjectAdvancedView
}
export default metadata

export const ProjectAdvancedViewStory = (args) => (
  <ProjectAdvancedView {...args} />
)

ProjectAdvancedViewStory.args = {}
