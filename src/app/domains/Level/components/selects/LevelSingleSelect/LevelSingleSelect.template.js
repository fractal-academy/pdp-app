import PropTypes from 'prop-types'
import { Select, Typography } from 'antd'
import * as styles from './LevelSingleSelect.style'
import { LevelSimpleView } from '../../views'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography
/**
 * @info LevelSingleSelect (09 Mar 2021) // CREATION DATE
 *
 * @comment LevelSingleSelect - React component.
 *
 * @since 09 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const LevelSingleSelect = (props) => {
  // [INTERFACES]
  const { technologyId } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.TECHNOLOGIES).doc(technologyId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <Select style={styles.levelSelectWidth} size="large">
      {technology &&
        Object.keys(technology.levelIds).map((level) => (
          <Select.Option value={level}>
            <LevelSimpleView levelId={level} />
          </Select.Option>
        ))}
    </Select>
  )
}

// [PROPTYPES]
LevelSingleSelect.propTypes = {
  technologyId: PropTypes.string.isRequired
}

export default LevelSingleSelect
