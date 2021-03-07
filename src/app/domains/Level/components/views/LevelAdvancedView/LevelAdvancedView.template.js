import PropTypes from 'prop-types'
import { LevelSimpleView } from '../'
import { Typography } from 'antd'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography
/**
 * @info LevelAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment LevelAdvancedView - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const LevelAdvancedView = (props) => {
  // [INTERFACES]
  const { levelId, subLevelId } = props

  // [ADDITIONAL_HOOKS]
  const [subLevel, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.SUB_LEVELS).doc(subLevelId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <>
      <LevelSimpleView levelId={levelId} />
      <Text strong type="secondary">
        {` lvl•${subLevel.name}`}
      </Text>
    </>
  )
}

// [PROPTYPES]
LevelAdvancedView.propTypes = {
  levelId: PropTypes.string.isRequired,
  subLevelId: PropTypes.string.isRequired
}

export default LevelAdvancedView
