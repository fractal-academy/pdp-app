import PropTypes from 'prop-types'
import { Select } from 'antd'
import { SKILLS_VALUES } from '~/constants'
import * as styles from './SkillSingleSelect.style'
import { useEffect, useState } from 'react'
/**
 * @info SkillSingleSelect (05 Mar 2021) // CREATION DATE
 *
 * @comment SkillSingleSelect - React component.
 *
 * @since 09 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SkillSingleSelect = (props) => {
  // [INTERFACES]
  const { skill, onSkillSelect } = props

  // [COMPONENT_STATE_HOOKS]
  const [skillName, setSkillName] = useState(skill || SKILLS_VALUES[0])

  // [HELPER_FUNCTIONS]
  const handleSkillSelect = (value) => {
    onSkillSelect && onSkillSelect(value)
    setSkillName(value)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    onSkillSelect && onSkillSelect(skillName)
  }, [])

  // [TEMPLATE]
  return (
    <Select
      style={styles.skillSelectWidth}
      defaultValue={skillName}
      onChange={handleSkillSelect}
      size="large">
      {SKILLS_VALUES.map((skill) => (
        <Select.Option value={skill}>{skill}</Select.Option>
      ))}
    </Select>
  )
}

// [PROPTYPES]
SkillSingleSelect.propTypes = {
  skill: PropTypes.string,
  onSkillSelect: PropTypes.func
}

export default SkillSingleSelect
