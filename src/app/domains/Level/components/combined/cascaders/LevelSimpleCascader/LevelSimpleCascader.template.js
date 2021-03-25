import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Cascader } from 'antd'
import { getDocumentData } from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info LevelSimpleCascader (22 Mar 2021) // CREATION DATE
 *
 * @comment LevelSimpleCascader - React component.
 *
 * @since 24 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @param {Array.<string>}         [props.levelTree]             Controlled tree data.
 * @param {function}               [props.loadLevel]             Function that loads sub levels.
 * @param {Array.<string>}         [props.defaultValue]          Default selected levels.
 * @param {Array.<string>}         [props.defaultTree]           Default tree.
 * @param {string}                  props.docId                  Document id in firestore that will using to build tree.
 * @param {function}               [props.onLevelSelect]         Function that runs on level select.
 * @param {string}                  props.loadFrom               Collection name in firestore.
 *
 * @return {React.FC}
 */

const LevelSimpleCascader = (props) => {
  // [INTERFACES]
  const {
    levelTree,
    loadLevel,
    defaultValue,
    defaultTree,
    docId,
    onLevelSelect,
    loadFrom,
    ...rest
  } = props

  // [COMPONENT_STATE_HOOKS]
  const [treeData, setTreeData] = useState(defaultTree ?? [])
  const [levelLoading, setLevelLoading] = useState(true)

  // [HELPER_FUNCTIONS]
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    const docWithLevels = await getDocumentData(loadFrom, docId)
    targetOption.children = []

    for (const subLevel of Object.values(
      docWithLevels.levelIds[targetOption.value]
    )) {
      const subLevelData = await getDocumentData(
        COLLECTIONS.SUB_LEVELS,
        subLevel
      )
      targetOption.children.push({ label: subLevelData.name, value: subLevel })
    }
    targetOption.loading = false

    setTreeData([...treeData])
  }

  // [USE_EFFECTS]
  useEffect(() => {
    if (defaultTree) {
      setLevelLoading(false)
    } else {
      const fetchLevels = async () => {
        setLevelLoading(true)
        try {
          const docWithLevels = await getDocumentData(loadFrom, docId)

          const levelMap = []

          for (const levelId of Object.keys(docWithLevels.levelIds)) {
            const levelData = await getDocumentData(COLLECTIONS.LEVELS, levelId)

            levelMap.push({
              label: levelData.name,
              value: levelId,
              isLeaf: false
            })
          }
          setTreeData(levelMap)
        } catch (error) {
          console.log('level loading', error)
        }
        setLevelLoading(false)
      }
      fetchLevels()
    }
  }, [docId, loadFrom])

  // [TEMPLATE]
  return (
    <Cascader
      size="large"
      placeholder="Select level"
      onChange={(value) => onLevelSelect(value, treeData)}
      options={levelTree ?? treeData}
      loadData={loadLevel ?? loadData}
      defaultValue={defaultValue}
      disabled={levelLoading}
      {...rest}
    />
  )
}

// [PROPTYPES]
LevelSimpleCascader.propTypes = {
  levelTree: PropTypes.arrayOf(PropTypes.string),
  loadLevel: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  defaultTree: PropTypes.arrayOf(PropTypes.string),
  docId: PropTypes.string,
  loadFrom: PropTypes.string,
  onLevelSelect: PropTypes.func
}

export default LevelSimpleCascader
