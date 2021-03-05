import React from 'react'
import ProjectAdvancedForm from './ProjectAdvancedForm.template'

const metadata = {
  title: 'app/domains/Project/components/forms/ProjectAdvancedForm',
  component: ProjectAdvancedForm
}
export default metadata

export const ProjectAdvancedFormStory = (args) => (
  <ProjectAdvancedForm {...args} />
)

ProjectAdvancedFormStory.args = {}
