import PropTypes from 'prop-types'
import { List, Space } from 'antd'
import { TechnologyAdvancedView } from 'domains/Technology/components/views'
import { Edit, Remove } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
/**
 * @info TechnologySimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologySimpleList - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologySimpleList = (props) => {
  // [INTERFACES]
  const { technologies, refCollectionMaterials, extra } = props

  // [TEMPLATE]
  return (
    <List
      grid={{ gutter: 10, column: extra ? 3 : 1 }}
      dataSource={technologies}
      renderItem={(technology) => (
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
                  />
                </Space>
              )
            }
          />
        </List.Item>
      )}
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
