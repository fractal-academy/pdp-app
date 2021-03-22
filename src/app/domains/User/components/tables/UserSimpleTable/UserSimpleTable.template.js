import { Table, Typography } from 'antd'
import { UserSimpleView } from 'domains/User/components/views'
import { RoleSimpleView } from 'domains/Role/components/views'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { Spinner } from '~/components'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography
/**
 * @info UserSimpleTable (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */
let columns = [
  {
    title: 'User',
    key: 'user',
    render: (text, data) => <UserSimpleView withAvatar id={data.id} />
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
  }
]

const UserSimpleTable = (props) => {
  // [ADDITIONAL_HOOKS]
  const [usersData, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.USERS)
  )

  // [TEMPLATE]
  if (loading) return <Spinner />

  return <Table columns={columns} dataSource={usersData} pagination={false} />
}

export default UserSimpleTable
