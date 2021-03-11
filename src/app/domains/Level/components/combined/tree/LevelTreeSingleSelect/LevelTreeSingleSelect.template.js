import PropTypes from 'prop-types'
import { useState } from 'react'
import { TreeSelect, Typography, Form } from 'antd'
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
  const { technologyId, disabled, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loading] = useDocumentData(
    !disabled &&
      technologyId &&
      firestore.collection(COLLECTIONS.TECHNOLOGIES).doc(technologyId)
  )

  // [COMPONENT_STATE_HOOKS]
  const [value, setValue] = useState('')

  // [HELPER_FUNCTIONS]
  const onChange = (value) => {
    setValue(value)
  }

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <Form.Item {...rest}>
      <TreeSelect
        size="large"
        disabled={disabled}
        showSearch
        style={styles.levelTreeSingleSelectWidth}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        value={value}
        onChange={onChange}>
        {technology?.levelIds &&
          Object.keys(technology.levelIds).map((level) => (
            <TreeNode title={<LevelSimpleView levelId={level} value={level} />}>
              {technology.levelIds[level].map((sublevel) => (
                <TreeNode
                  value={sublevel}
                  title={<LevelSimpleView sublevelId={sublevel} />}
                />
              ))}
            </TreeNode>
          ))}
      </TreeSelect>
    </Form.Item>
  )
}

// [PROPTYPES]
LevelTreeSingleSelect.propTypes = {
  technologyId: PropTypes.string.isRequired
}

export default LevelTreeSingleSelect
