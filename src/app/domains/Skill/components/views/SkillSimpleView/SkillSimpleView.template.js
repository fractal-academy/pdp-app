import PropTypes from 'prop-types'
import firestore from '~/services/Firebase/firestore/index'
import { Text } from 'antd-styled'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info SkillSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment SkillSimpleView - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SkillSimpleView = (props) => {
  // [INTERFACES]
  const { skillId } = props

  // [ADDITIONAL_HOOKS]
  const [skill, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.SKILLS).doc(skillId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return <Text>{skill.name}</Text>
}

// [PROPTYPES]
SkillSimpleView.propTypes = {
  skillId: PropTypes.string.isRequired
}

export default SkillSimpleView
