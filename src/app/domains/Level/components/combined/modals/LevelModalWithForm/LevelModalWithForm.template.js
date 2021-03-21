import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form, Modal, Space, Tree, Empty, message } from 'antd'
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
  const { visible, onCreate, onCancel } = props

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)
  const [levelTree, setLevelTree] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([])

  // [HELPER_FUNCTIONS]
  const onFinish = async (data, levelIds) => {
    setLoading(true)

    try {
      await onCreate({ ...data, levelIds })

      form.resetFields()
      setLevelTree([])
    } catch (error) {
      console.log('level create', error)
    }

    setLoading(false)
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
              disabled={loading}
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

  // [TEMPLATE]
  return (
    <Modal
      visible={visible}
      title="Create a new level preset"
      okText="Create"
      width="650px"
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={() => {
        levelTree.length
          ? form.submit()
          : message.error('Create at least one level')
      }}>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <LevelSimpleForm
            form={form}
            onFinish={onFinish}
            onLevelAdd={onLevelAdd}
            disable={loading}
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
  onCancel: PropTypes.func
}

export default LevelModalWithForm
