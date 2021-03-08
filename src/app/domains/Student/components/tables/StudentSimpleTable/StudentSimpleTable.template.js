import PropTypes from 'prop-types'
import { Table, Typography } from 'antd'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'

const { Text } = Typography

/**
 * @info StudentSimpleTable (08 Mar 2021) // CREATION DATE
 *
 * @comment StudentSimpleTable - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

let columns = [
  {
    title: 'Student',
    key: 'student',
    render: (text, data) => (
      <UserSimpleView
        avatarURL={data.avatarURL}
        firstName={data.firstName}
        secondName={data.secondName}
        email={data.email}
      />
    )
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
    render: (companyId) => <CompanySimpleView companyId={companyId} />
  }
]

const StudentSimpleTable = (props) => {
  // [INTERFACES]
  const { data } = props

  // [TEMPLATE]
  return <Table columns={columns} dataSource={data} pagination={false} />
}

// [PROPTYPES]
StudentSimpleTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default StudentSimpleTable
