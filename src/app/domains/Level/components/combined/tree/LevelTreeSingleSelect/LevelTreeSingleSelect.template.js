import PropTypes from 'prop-types'
import { useState } from 'react'
import { TreeSelect, Typography } from 'antd'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { LevelSimpleView } from 'domains/Level/components/views'
import * as styles from './LevelTreeSingleSelect.style'
const { Text } = Typography
const { TreeNode } = TreeSelect

/**
 * @info LevelTreeSingleSelect (09 Mar 2021) // CREATION DATE
 *
 * @comment LevelTreeSingleSelect - React component.
 *
 * @since 09 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const LevelTreeSingleSelect = (props) => {
  // [INTERFACES]
  const { technologyId } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.TECHNOLOGIES).doc(technologyId)
  )

  // [COMPONENT_STATE_HOOKS]
  const [value, setValue] = useState()

  // [HELPER_FUNCTIONS]
  const onChange = () => {
    setValue(value)
  }

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <TreeSelect
      showSearch
      style={styles.levelTreeSingleSelectWidth}
      value={value}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}>
      {technology.levelIds &&
        Object.keys(technology.levelIds).map((level) => (
          <TreeNode value={level} title={<LevelSimpleView levelId={level} />}>
            {technology.levelIds[level].map((sublevel) => (
              <TreeNode
                value={sublevel}
                title={<LevelSimpleView sublevelId={sublevel} />}
              />
            ))}
          </TreeNode>
        ))}
    </TreeSelect>
  )
}

// [PROPTYPES]
LevelTreeSingleSelect.propTypes = {
  technologyId: PropTypes.string.isRequired
}

export default LevelTreeSingleSelect
