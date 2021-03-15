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
 * @since 14 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologySimpleList = (props) => {
  // [INTERFACES]
  const { data } = props

  // [TEMPLATE]
  return (
    <List
      grid={{ gutter: 10, column: 3 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <TechnologyAdvancedView
            {...item}
            extra={
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
            }
          />
        </List.Item>
      )}
    />
  )
}

// [PROPTYPES]
TechnologySimpleList.propTypes = {
  data: PropTypes.array.isRequired
}

export default TechnologySimpleList
