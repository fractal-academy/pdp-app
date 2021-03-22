import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Table, Typography } from 'antd'
import { UserSimpleView } from 'domains/User/components/views'
import { RoleSimpleView } from 'domains/Role/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { SpecialitySimpleView } from 'domains/Speciality/components/views'
import { ROLES } from '~/constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner } from '~/components'
const { Text } = Typography
/**
 * @info UserSimpleTable (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */
let columns = [
  {
    title: 'User',
    key: 'user',
    render: (text, data) => <UserSimpleView withAvatar {...data} />
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
    render: (companyId) =>
      companyId ? (
        <CompanySimpleView companyId={companyId} />
      ) : (
        <Text type="secondary">None</Text>
      )
  },
  {
    title: 'Speciality',
    key: 'speciality',
    dataIndex: 'specialityId',
    render: (specialityId) =>
      specialityId ? (
        <SpecialitySimpleView specialityId={specialityId} />
      ) : (
        <Text type="secondary">None</Text>
      )
  }
]

const UserSimpleTable = (props) => {
  // [INTERFACES]
  const { viewFor } = props
  const [userColumns, setUserColumns] = useState(columns)

  // [ADDITIONAL_HOOKS]
  const [usersData, loading] = useCollectionData(
    viewFor
      ? firestore.collection(COLLECTIONS.USERS).where('role', '==', viewFor)
      : firestore.collection(COLLECTIONS.USERS)
  )

  // [USE_EFFECTS]
  useEffect(() => {
    viewFor === ROLES.STUDENT &&
      columns.find(({ key }, idx) => {
        key === 'speciality' &&
          setUserColumns(
            [].concat(columns.slice(0, idx), columns.slice(idx + 1))
          )
      })
  }, [])

  // [TEMPLATE]
  if (loading) return <Spinner />

  return (
    <Table columns={userColumns} dataSource={usersData} pagination={false} />
  )
}

// [PROPTYPES]
UserSimpleTable.propTypes = {
  viewFor: PropTypes.string
}

export default UserSimpleTable
