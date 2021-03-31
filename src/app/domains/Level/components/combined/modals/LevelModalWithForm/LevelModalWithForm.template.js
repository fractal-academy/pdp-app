import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Form, Modal, Space, Tree, Empty, message, Button } from 'antd'
import { Remove, Text, Row, Col, Box } from 'antd-styled'
import { DeleteOutlined } from '@ant-design/icons'
import { LevelSimpleForm } from 'domains/Level/components/forms'
import _ from 'lodash'
import { Spinner } from '~/components'
import { getDocumentData } from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info LevelModalWithForm (15 Mar 2021) // CREATION DATE
 *
 * @comment LevelModalWithForm - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.8 ) // LAST-EDIT DATE
 *
 * @return {React.FC}
 */

const LevelModalWithForm = (props) => {
  // [INTERFACES]
  const {
    visible,
    onCreate,
    edit,
    onEdit,
    onDelete,
    defaultValues,
    onCancel
  } = props

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  const [createLoading, setCreateLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [levelTree, setLevelTree] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([])

  // [HELPER_FUNCTIONS]
  const onFinishCreate = async (data, levelIds) => {
    setCreateLoading(true)

    try {
      if (edit) {
        await onEdit({ ...data, levelIds })
      } else {
        await onCreate({ ...data, levelIds })
      }

      form.resetFields()
      setLevelTree([])
    } catch (error) {
      console.log('level create', error)
    }

    setCreateLoading(false)
  }

  const onLevelAdd = (data, setValues) => {
    const tree = Object.keys(data).map((level) => {
      setExpandedKeys([...expandedKeys, level])
      return {
        title: level,
        key: level,
        children: []
      }
    })

    tree.forEach((level) => {
      level.children = data[level.title].map((subLevel) => {
        const subLevelKey = `${level.key}_${subLevel}`

        const deleteSubLevel = () => {
          const newLevelIds = {
            ...data,
            [level.title]: _.filter(
              data[level.title],
              (level) => level !== subLevel
            )
          }
          // Delete lvl if it without sub levels
          if (!newLevelIds[level.title].length) {
            delete newLevelIds[level.title]
          }
          setValues(newLevelIds)
        }

        const TreeElement = (
          <Space align="baseline">
            <Text>{subLevel}</Text>
            <Remove
              shape="default"
              tooltip="Remove"
              type="text"
              size="small"
              disabled={createLoading || deleteLoading}
              icon={<DeleteOutlined />}
              onSubmit={deleteSubLevel}
            />
          </Space>
        )
        return {
          title: TreeElement,
          key: subLevelKey
        }
      })
    })
    setLevelTree(tree)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    if (edit) {
      const fetchData = async () => {
        setDataLoading(true)

        const levelPresetData = await getDocumentData(
          COLLECTIONS.LEVEL_PRESETS,
          edit
        )
        const tree = []

        const expandedKeys = []
        for (const levelKey of Object.keys(levelPresetData.levelIds)) {
          const levelData = await getDocumentData(COLLECTIONS.LEVELS, levelKey)

          expandedKeys.push(levelKey)

          const subLevelsItem = []
          for (const subLevelKey of levelPresetData.levelIds[levelKey]) {
            const subLevelData = await getDocumentData(
              COLLECTIONS.SUB_LEVELS,
              subLevelKey
            )

            const deleteSubLevel = () => {
              console.log('del')
            }

            const TreeElement = (
              <Space align="baseline">
                <Text>{subLevelData.name}</Text>
                <Remove
                  shape="default"
                  tooltip="Remove"
                  type="text"
                  size="small"
                  disabled={createLoading || deleteLoading}
                  icon={<DeleteOutlined />}
                  onSubmit={deleteSubLevel}
                />
              </Space>
            )

            subLevelsItem.push({ title: TreeElement, key: subLevelData.id })
          }

          tree.push({
            title: levelData.name,
            key: levelData.id,
            children: subLevelsItem
          })
        }
        setExpandedKeys(expandedKeys)
        setLevelTree(tree)
        form.setFieldsValue({
          name: levelPresetData.name,
          type: levelPresetData.type
        })

        setDataLoading(false)
      }
      fetchData()
    }
  }, [edit])

  useEffect(() => {
    if (!visible) {
      setLevelTree([])
    }
  }, [visible])

  // [COMPUTED_PROPERTIES]
  const actionName = edit ? 'Edit' : 'Create'
  const modalTitle = edit ? (
    <Row>
      <Col>
        <Text>{actionName} a level preset</Text>
      </Col>
      <Col> {dataLoading && <Spinner size={18} />}</Col>
    </Row>
  ) : (
    `${actionName} a new level preset`
  )
  const actionButtons = (
    <Box display="flex" justifyContent={edit ? 'space-between' : 'flex-end'}>
      {edit && (
        <Remove
          text="Delete"
          onSubmit={async () => {
            setDeleteLoading(true)
            try {
              await onDelete()
              message.success('Level preset was successfully deleted.')
            } catch (error) {
              console.log('delete levelPreset', error)
            }

            setDeleteLoading(false)
          }}
          loading={deleteLoading}
        />
      )}
      <Box>
        <Button onClick={onCancel}>Cancel</Button>

        <Button
          onClick={() => {
            levelTree.length
              ? form.submit()
              : message.error('Create at least one level')
          }}
          type="primary"
          loading={createLoading}
          disabled={deleteLoading}>
          {edit ? 'Save' : 'Create'}
        </Button>
      </Box>
    </Box>
  )
  // [TEMPLATE]
  return (
    <Modal
      visible={visible}
      title={modalTitle}
      okText={actionName}
      width="650px"
      onCancel={onCancel}
      footer={actionButtons}>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <LevelSimpleForm
            form={form}
            onFinish={onFinishCreate}
            onLevelAdd={onLevelAdd}
            initialValues={defaultValues}
            disable={createLoading || deleteLoading || dataLoading}
          />
        </Col>

        <Col span={24}>
          {levelTree.length ? (
            <Tree
              expandedKeys={expandedKeys}
              treeData={levelTree}
              autoExpandParent
              selectable={false}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No levels"
            />
          )}
        </Col>
      </Row>
    </Modal>
  )
}

// [PROPTYPES]
LevelModalWithForm.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
  edit: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default LevelModalWithForm
