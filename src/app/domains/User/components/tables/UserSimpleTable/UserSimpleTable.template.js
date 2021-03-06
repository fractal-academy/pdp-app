import PropTypes from 'prop-types'
import { Table } from 'antd'

/**
 * @info UserSimpleTable (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleTable - React component.
 *
 * @since 06 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserSimpleTable = (props) => {
  // [INTERFACES]
  const { data, columns } = props

  // [TEMPLATE]
  return <Table columns={columns} dataSource={data} pagination={false} />
}

// [PROPTYPES]
UserSimpleTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
}

export default UserSimpleTable
