import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Select } from 'antd'
import { Box, Edit, Text } from 'antd-styled'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import _ from 'lodash'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { LevelModalWithForm } from 'domains/Level/components/combined/modals'
import firestore, {
  deleteDocument,
  getDocumentRef,
  setDocument,
  updateDocument
} from '~/services/Firebase/firestore'
import { TYPES_VALUES } from '~/constants'
import { COLLECTIONS } from 'app/constants'

/**
 * @info LevelSelectWithCreate (15 Mar 2021) // CREATION DATE
 *
 * @comment LevelSelectWithCreate - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const createLevels = async (levelIds) => {
  const fbLevelIds = {}

  for (const level of Object.keys(levelIds)) {
    const levelId = await getDocumentRef(COLLECTIONS.LEVELS).id
    fbLevelIds[levelId] = []
    await setDocument(COLLECTIONS.LEVELS, levelId, { id: levelId, name: level })
  }

  let i = 0
  const fbLevelsKeys = Object.keys(fbLevelIds)
  let prevSubLevel = ''

  for (const subLevels of Object.values(levelIds)) {
    for (const subLevel of subLevels) {
      const subLevelId = await getDocumentRef(COLLECTIONS.SUB_LEVELS).id

      fbLevelIds[fbLevelsKeys[i]].push(subLevelId)
      await setDocument(COLLECTIONS.SUB_LEVELS, subLevelId, {
        id: subLevelId,
        name: subLevel,
        requiredLevel: prevSubLevel ?? null
      })

      prevSubLevel = subLevelId
    }
    i++
  }

  return fbLevelIds
}

const LevelSelectWithCreate = (props) => {
  // [INTERFACES]
  const { value, levelType, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const [presets, loading] = useCollectionData(
    levelType &&
      firestore
        .collection(COLLECTIONS.LEVEL_PRESETS)
        .where('type', '==', levelType)
  )

  // [COMPONENT_STATE_HOOKS]
  const [visible, setVisible] = useState(false)
  const [editItem, setEditItem] = useState('')

  // [HELPER_FUNCTIONS]
  const onLevelCreate = async (data) => {
    const { name, type, levelIds } = data
    try {
      const fbLevelIds = await createLevels(levelIds)

      const levelPresetId = getDocumentRef(COLLECTIONS.LEVEL_PRESETS).id
      const data = {
        levelIds: fbLevelIds,
        name,
        type,
        id: levelPresetId
      }
      await setDocument(COLLECTIONS.LEVEL_PRESETS, levelPresetId, data)
      setVisible(false)
      setEditItem('')
    } catch (error) {
      console.log('level preset create', error)
    }
  }

  const onEdit = async (data) => {
    const { name, type } = data
    try {
      const data = {
        name,
        type
      }
      await updateDocument(COLLECTIONS.LEVEL_PRESETS, editItem, data)
      setVisible(false)
      setEditItem('')
    } catch (error) {
      console.log('level preset edit', error)
    }
  }

  const onLevelDelete = async () => {
    const editedPreset = _.find(presets, ({ id }) => id === editItem)

    const levelIds = editedPreset.levelIds
    for (const level of Object.keys(levelIds)) {
      for (const subLevelId of editedPreset.levelIds[level]) {
        await deleteDocument(COLLECTIONS.SUB_LEVELS, subLevelId)
      }
      await deleteDocument(COLLECTIONS.LEVELS, level)
    }
    await deleteDocument(COLLECTIONS.LEVEL_PRESETS, editItem)

    setVisible(false)
    setEditItem('')
  }

  // [TEMPLATE]
  return (
    <>
      <Select
        loading={loading}
        placeholder="Select levels preset"
        optionLabelProp="label"
        dropdownRender={(menu) => (
          <Box>
            {menu}
            <Button
              type="text"
              onClick={() => setVisible(true)}
              icon={<PlusOutlined />}
              block>
              create
            </Button>
          </Box>
        )}
        value={!loading && value}
        {...rest}>
        {presets?.map((levelPreset) => (
          <Select.Option
            key={levelPreset.id}
            value={levelPreset.id}
            label={levelPreset.name}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Text>{levelPreset.name}</Text>

              <Edit
                shape="default"
                tooltip="Edit"
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={(e) => {
                  setEditItem(levelPreset.id)
                  setVisible(true)
                  e.stopPropagation()
                }}
              />
            </Box>
          </Select.Option>
        ))}
      </Select>
      <LevelModalWithForm
        visible={visible}
        onCreate={onLevelCreate}
        onEdit={onEdit}
        edit={editItem}
        onDelete={onLevelDelete}
        onCancel={() => {
          setVisible(false)
          setEditItem('')
        }}
      />
    </>
  )
}

// [PROPTYPES]
LevelSelectWithCreate.propTypes = {
  value: PropTypes.string,
  levelType: PropTypes.oneOf(TYPES_VALUES),
  rest: PropTypes.object
}

export default LevelSelectWithCreate
