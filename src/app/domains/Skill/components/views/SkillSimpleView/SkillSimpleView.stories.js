import React from 'react'
import SkillSimpleView from './SkillSimpleView.template'

const metadata = {
  title: 'app/domains/Skill/components/views/SkillSimpleView',
  component: SkillSimpleView
}
export default metadata

export const SkillSimpleViewStory = (args) => (
  <SkillSimpleView skillId="789" {...args} />
)

SkillSimpleViewStory.args = {}
