import PropTypes from 'prop-types'
import { Table, Typography } from 'antd'
import { useHistory, generatePath } from 'react-router-dom'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { ROUTE_PATHS } from 'app/constants'
const { Text } = Typography

/**
 * @info StudentSimpleTable (08 Mar 2021) // CREATION DATE
 *
 * @comment StudentSimpleTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

let columns = [
  {
    title: 'Student',
    key: 'student',
    render: (text, data) => <UserSimpleView withAvatar {...data} />
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email) => <Text type="secondary">{email}</Text>
  },
  {
    title: 'Company',
    key: 'company',
    dataIndex: 'companyId',
    render: (text, data) => <CompanySimpleView companyId={data.companyId} />
  }
]

const StudentSimpleTable = (props) => {
  // [INTERFACES]
  const { data } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [TEMPLATE]
  return (
    <Table
      onRow={(record) => ({
        onClick: () =>
          history.push(generatePath(ROUTE_PATHS.USER_SHOW, { id: record.id })),
        onMouseEnter: (e) => {
          e.target.style.cursor = 'pointer'
        }
      })}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  )
}

// [PROPTYPES]
StudentSimpleTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default StudentSimpleTable
