import PropTypes from 'prop-types'
import { Table, Typography } from 'antd'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { RoleSimpleView } from 'domains/Role/components/views'
import { SpecialitySimpleView } from 'domains/Speciality/components/views'
const { Text } = Typography
/**
 * @info UserSimpleTable (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleTable - React component.
 *
 * @since 06 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */
const columns = [
  {
    title: 'User',
    key: 'user',
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
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role) => <RoleSimpleView role={role} />
  },
  {
    title: 'Company',
    key: 'company',
    dataIndex: 'companyId',
    render: (companyId) => <CompanySimpleView companyId={companyId} />
  },
  {
    title: 'Speciality',
    key: 'speciality',
    dataIndex: 'specialityId',
    render: (specialityId) => (
      <SpecialitySimpleView specialityId={specialityId} />
    )
  }
]
const UserSimpleTable = (props) => {
  // [INTERFACES]
  const { data } = props

  // [TEMPLATE]
  return <Table columns={columns} dataSource={data} pagination={false} />
}

// [PROPTYPES]
UserSimpleTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
}

export default UserSimpleTable
