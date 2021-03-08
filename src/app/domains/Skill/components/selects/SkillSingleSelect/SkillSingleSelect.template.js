import PropTypes from 'prop-types'
import { Select } from 'antd'
import { SKILLS_VALUES } from '~/constants'
import * as styles from './SkillSingleSelect.style'

/**
 * @info SkillSingleSelect (05 Mar 2021) // CREATION DATE
 *
 * @comment SkillSingleSelect - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SkillSingleSelect = (props) => {
  // [INTERFACES]
  const { skill, onSkillSelect } = props

  // [HELPER_FUNCTIONS]
  const handleSkillSelect = (value) => {
    onSkillSelect && onSkillSelect(value)
  }

  // [TEMPLATE]
  return (
    <Select
      style={styles.skillSelectWidth}
      defaultValue={skill || SKILLS_VALUES[0]}
      onChange={handleSkillSelect}
      size="large"
      bordered={false}>
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
