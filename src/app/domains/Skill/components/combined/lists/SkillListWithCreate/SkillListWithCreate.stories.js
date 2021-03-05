import React from 'react'
import SkillListWithCreate from './SkillListWithCreate.template'

const metadata = {
  title: 'app/domains/Skill/components/combined/lists/SkillListWithCreate',
  component: SkillListWithCreate
}
export default metadata

export const SkillListWithCreateStory = (args) => (
  <SkillListWithCreate {...args} />
)

SkillListWithCreateStory.args = {}
