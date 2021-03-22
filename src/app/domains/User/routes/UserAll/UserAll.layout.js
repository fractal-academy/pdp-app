import { UserAdvancedTable } from 'domains/User/components/tables'
import { PageWrapper } from '~/components/HOC'
import { Button } from 'antd'
/**
 * @info UserAll (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAll - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserAll = () => {
  // [TEMPLATE]
  const AddButton = <Button type="primary">Add user</Button>

  return (
    <PageWrapper title="Users" fullWidth inlineHeader>
      <UserAdvancedTable tabBarExtraContent={{ right: AddButton }} />
    </PageWrapper>
  )
}

export default UserAll
