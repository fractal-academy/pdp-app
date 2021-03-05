import React from 'react'
import SkillCreate from './SkillCreate.layout'

const metadata = {
  title: 'app/domains/Skill/routes/SkillCreate',
  component: SkillCreate
}
export default metadata

export const SkillCreateStory = (args) => <SkillCreate {...args} />

SkillCreateStory.args = {}
