import React from 'react'
import ProjectSimpleList from './ProjectSimpleList.template'

const metadata = {
  title: 'app/domains/Project/components/lists/ProjectSimpleList',
  component: ProjectSimpleList
}
export default metadata

export const ProjectSimpleListStory = (args) => <ProjectSimpleList {...args} />

ProjectSimpleListStory.args = {}
