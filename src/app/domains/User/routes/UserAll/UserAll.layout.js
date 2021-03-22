import { UserAdvancedTable } from 'domains/User/components/tables'
import { Button, Typography } from 'antd'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner } from '~/components'
const { Title } = Typography

/**
 * @info UserAll (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAll - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserAll = () => {
  // [ADDITIONAL_HOOKS]
  const [usersData, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.USERS)
  )

  // [TEMPLATE]

  const AddButton = <Button type="primary">Add user</Button>

  if (loading) return <Spinner />
  return (
    <>
      <Title>Users</Title>
      <UserAdvancedTable
        data={usersData}
        tabBarExtraContent={{ right: AddButton }}
      />
    </>
  )
}

export default UserAll
