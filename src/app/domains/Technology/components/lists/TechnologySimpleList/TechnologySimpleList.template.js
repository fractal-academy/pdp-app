import PropTypes from 'prop-types'
import { useState } from 'react'
import { List, Space } from 'antd'
import { Edit, Remove } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { TechnologyAdvancedView } from 'domains/Technology/components/views'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info TechnologySimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologySimpleList - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const deleteData = async (field, collection) => {
  for (const id of Object.keys(field)) {
    await firestore.collection(collection).doc(id).delete()
  }
}

const TechnologySimpleList = (props) => {
  // [INTERFACES]
  const { technologies, refCollectionMaterials, extra } = props

  // [COMPONENT_STATE_HOOKS]
  const [deleteLoading, setDeleteLoading] = useState(false)

  // [HELPER_FUNCTIONS]
  const deleteTechnology = async (technologyId) => {
    setDeleteLoading(true)
    try {
      const technologySnapshot = await firestore
        .collection(COLLECTIONS.TECHNOLOGIES)
        .doc(technologyId)
        .get()

      console.log(technologyId)

      const technology = technologySnapshot.data()

      await deleteData(technology.materialIds, COLLECTIONS.MATERIALS)
      await deleteData(technology.todoIds, COLLECTIONS.TODOS)
      await deleteData(technology.interviewIds, COLLECTIONS.INTERVIEWS)

      await firestore
        .collection(COLLECTIONS.TECHNOLOGIES)
        .doc(technologyId)
        .delete()
    } catch (error) {
      console.log('delete technology', error)
    }
    setDeleteLoading(false)
  }

  // [TEMPLATE]
  return (
    <List
      grid={{ gutter: 10, column: extra ? 3 : 1 }}
      dataSource={technologies}
      renderItem={(technology) =>
        technology.name && (
          <List.Item>
            <TechnologyAdvancedView
              name={technology.name}
              materialIds={Object.keys(technology.materialIds)}
              refCollectionMaterials={refCollectionMaterials}
              extra={
                extra && (
                  <Space>
                    <Edit
                      shape="default"
                      tooltip="Edit"
                      type="text"
                      icon={<EditOutlined />}
                    />
                    <Remove
                      shape="default"
                      tooltip="Remove"
                      type="text"
                      icon={<DeleteOutlined />}
                      loading={deleteLoading}
                      onSubmit={() => deleteTechnology(technology.id)}
                    />
                  </Space>
                )
              }
            />
          </List.Item>
        )
      }
    />
  )
}

// [PROPTYPES]
TechnologySimpleList.propTypes = {
  technologies: PropTypes.array.isRequired,
  refCollectionMaterials: PropTypes.string.isRequired,
  extra: PropTypes.bool
}

export default TechnologySimpleList
