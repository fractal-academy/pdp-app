import React from 'react'
import SkillSingleSelect from './SkillSingleSelect.template'

const metadata = {
  title: 'app/domains/Skill/components/selects/SkillSingleSelect',
  component: SkillSingleSelect
}
export default metadata
export const SkillSingleSelectStory = (args) => (
  <SkillSingleSelect onSkillSelect={(value) => console.log(value)} {...args} />
)

SkillSingleSelectStory.args = {}
