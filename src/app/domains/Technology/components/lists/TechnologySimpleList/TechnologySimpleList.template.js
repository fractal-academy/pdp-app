import PropTypes from 'prop-types'
import { useState } from 'react'
import { List, Space } from 'antd'
import { Edit, Remove } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { TechnologyAdvancedView } from 'domains/Technology/components/views'
import { deleteDocument, getDocumentData } from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'

/**
 * @info TechnologySimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologySimpleList - React component.
 *
 * @since 20 Mar 2021 ( v.0.0.8 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const deleteData = async (iterableList, collection) => {
  if (iterableList) {
    for (const id of Object.keys(iterableList)) {
      await deleteDocument(collection, id)
    }
  }
}

const TechnologySimpleList = (props) => {
  // [INTERFACES]
  const { technologies, refCollectionMaterials, extra } = props

  // [COMPONENT_STATE_HOOKS]
  const [deleteLoading, setDeleteLoading] = useState('')

  // [HELPER_FUNCTIONS]
  const deleteTechnology = async (technologyId) => {
    setDeleteLoading(technologyId)
    try {
      const technology = await getDocumentData(
        COLLECTIONS.TECHNOLOGIES,
        technologyId
      )

      await deleteData(technology?.materialIds, COLLECTIONS.MATERIALS)
      await deleteData(technology?.todoIds, COLLECTIONS.TODOS)
      await deleteData(technology?.interviewIds, COLLECTIONS.INTERVIEWS)

      await deleteDocument(COLLECTIONS.TECHNOLOGIES, technologyId)
    } catch (error) {
      console.log('delete technology', error)
    }
    setDeleteLoading('')
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
              materialIds={
                technology?.materialIds && Object.keys(technology.materialIds)
              }
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
                      loading={technology.id === deleteLoading}
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
