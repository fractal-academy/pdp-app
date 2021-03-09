import PropTypes from 'prop-types'
import { Typography } from 'antd'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography
/**
 * @info LevelSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment LevelSimpleView - React component.
 *
 * @since 07 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const LevelSimpleView = (props) => {
  // [INTERFACES]
  const { levelId, sublevelId } = props

  // [ADDITIONAL_HOOKS]
  const [level, loading] = useDocumentData(
    firestore
      .collection(sublevelId ? COLLECTIONS.SUB_LEVELS : COLLECTIONS.LEVELS)
      .doc(sublevelId ? sublevelId : levelId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <Text type="secondary" strong>
      {level.name}
    </Text>
  )
}

// [PROPTYPES]
LevelSimpleView.propTypes = {
  levelId: PropTypes.string.isRequired
}

export default LevelSimpleView
