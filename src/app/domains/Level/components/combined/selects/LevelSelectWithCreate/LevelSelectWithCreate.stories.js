import React from 'react'
import LevelSelectWithCreate from './LevelSelectWithCreate.template'

const metadata = {
  title: 'app/domains/Level/components/combined/selects/LevelSelectWithCreate',
  component: LevelSelectWithCreate
}
export default metadata

export const LevelSelectWithCreateStory = (args) => (
  <LevelSelectWithCreate {...args} />
)

LevelSelectWithCreateStory.args = {}
