import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Select } from 'antd'
import { Box, Edit, Text } from 'antd-styled'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { LevelModalWithForm } from 'domains/Level/components/combined/modals'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { TYPES_VALUES } from '~/constants'

/**
 * @info LevelSelectWithCreate (15 Mar 2021) // CREATION DATE
 *
 * @comment LevelSelectWithCreate - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const createLevels = async (levelIds) => {
  const fbLevelIds = {}

  for (const level of Object.keys(levelIds)) {
    const { id } = await firestore.collection(COLLECTIONS.LEVELS).add({})
    fbLevelIds[id] = []
    await firestore
      .collection(COLLECTIONS.LEVELS)
      .doc(id)
      .set({ id, name: level })
  }

  let i = 0
  const fbLevelsKeys = Object.keys(fbLevelIds)
  let prevSubLevel = ''

  for (const subLevels of Object.values(levelIds)) {
    for (const subLevel of subLevels) {
      const { id } = await firestore.collection(COLLECTIONS.SUB_LEVELS).add({})

      fbLevelIds[fbLevelsKeys[i]].push(id)
      await firestore
        .collection(COLLECTIONS.SUB_LEVELS)
        .doc(id)
        .set({ id, name: subLevel, requiredLevel: prevSubLevel ?? null })

      prevSubLevel = id
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
    firestore
      .collection(COLLECTIONS.LEVEL_PRESETS)
      .where('type', '==', levelType)
  )

  // [COMPONENT_STATE_HOOKS]
  const [visible, setVisible] = useState(false)

  // [HELPER_FUNCTIONS]
  const onCreate = async (data) => {
    const { name, type, levelIds } = data
    try {
      const fbLevelIds = await createLevels(levelIds)

      const { id } = await firestore
        .collection(COLLECTIONS.LEVEL_PRESETS)
        .add({})
      const data = {
        levelIds: fbLevelIds,
        name,
        type,
        id
      }
      await firestore.collection(COLLECTIONS.LEVEL_PRESETS).doc(id).set(data)
      setVisible(false)
    } catch (error) {
      console.log('level preset create', error)
    }
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
                onClick={() => setVisible(true)}
              />
            </Box>
          </Select.Option>
        ))}
      </Select>
      <LevelModalWithForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
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
