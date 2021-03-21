// import PropTypes from 'prop-types'
// import { useEffect } from 'react'
// import { Select } from 'antd'
// import { SKILLS_VALUES } from '~/constants'
// import * as styles from './SkillSingleSelect.style'
//
// /**
//  * @info SkillSingleSelect (05 Mar 2021) // CREATION DATE
//  *
//  * @comment SkillSingleSelect - React component.
//  *
//  * @since 15 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
//  *
//  * @return {ReactComponent}
//  */
//
// const SkillSingleSelect = (props) => {
//   // [INTERFACES]
//   const { skill, onSkillSelect, ...rest } = props
//
//   // [USE_EFFECTS]
//   useEffect(() => {
//     rest.onChange && rest.onChange(skill || SKILLS_VALUES[0])
//   }, [])
//
//   // [TEMPLATE]
//   return (
//     <Select
//       style={styles.skillSelectWidth}
//       defaultValue={skill || SKILLS_VALUES[0]}
//       {...rest}>
//       {SKILLS_VALUES.map((skill) => (
//         <Select.Option value={skill}>{skill}</Select.Option>
//       ))}
//     </Select>
//   )
// }
//
// // [PROPTYPES]
// SkillSingleSelect.propTypes = {
//   skill: PropTypes.string,
//   onSkillSelect: PropTypes.func
// }
//
// export default SkillSingleSelect
