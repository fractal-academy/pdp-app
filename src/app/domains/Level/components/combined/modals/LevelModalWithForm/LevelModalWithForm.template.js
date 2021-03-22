import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form, Modal, Space, Tree, Empty, message, Button } from 'antd'
import { Remove, Text, Row, Col } from 'antd-styled'
import { DeleteOutlined } from '@ant-design/icons'
import { LevelSimpleForm } from 'domains/Level/components/forms'
import _ from 'lodash'

/**
 * @info LevelModalWithForm (15 Mar 2021) // CREATION DATE
 *
 * @comment LevelModalWithForm - React component.
 *
 * @since 20 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
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
  const [levelTree, setLevelTree] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(false)
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

  // [COMPUTED_PROPERTIES]
  const actionName = edit ? 'Edit' : 'Create'
  const actionButtons = (
    <>
      <Button onClick={onCancel}>Cancel</Button>
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

      <Button
        onClick={() => {
          levelTree.length
            ? form.submit()
            : message.error('Create at least one level')
        }}
        type="primary"
        loading={createLoading}
        disabled={deleteLoading}>
        {actionName}
      </Button>
    </>
  )
  // [TEMPLATE]
  return (
    <Modal
      visible={visible}
      title={`${actionName} a new level preset`}
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
            disable={createLoading || deleteLoading}
          />
        </Col>

        <Col span={24}>
          {levelTree.length ? (
            <Tree
              expandedKeys={expandedKeys}
              treeData={levelTree}
              defaultExpandAll
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
