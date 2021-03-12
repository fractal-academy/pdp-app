import PropTypes from 'prop-types'
import { List } from 'antd'
import { Remove } from 'antd-styled'

import { MaterialSimpleView } from 'domains/Material/components/views'
import { DeleteOutlined } from '@ant-design/icons'
/**
 * @info MaterialSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment MaterialSimpleList - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_DATA = [
  {
    type: 'url',
    name: 'https://t.me/thecodemedia/3648',
    url: 'https://t.me/thecodemedia/3648'
  },
  {
    type: 'image',
    name: 'road map',
    url:
      'https://firebasestorage.googleapis.com/v0/b/expenses-senseteq.appspot.com/o/photo_2020-11-27_19-32-45.jpg?alt=media&token=75958d4d-46ab-458f-b413-e81696c8c16d'
  },
  { type: 'zip', name: 'videos' }
]

const MaterialSimpleList = (props) => {
  // [INTERFACES]
  const { withDelete } = props

  // [TEMPLATE]
  return (
    <List
      dataSource={MOCK_DATA}
      renderItem={(material) => (
        <List.Item
          actions={withDelete && [<Remove icon={<DeleteOutlined />} />]}>
          <MaterialSimpleView size="lg" {...material} />
        </List.Item>
      )}
    />
  )
}

// [PROPTYPES]
MaterialSimpleList.propTypes = {
  withDelete: PropTypes.bool
}

export default MaterialSimpleList
