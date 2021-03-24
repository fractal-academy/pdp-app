import { UserAdvancedTable } from 'domains/User/components/tables'
import { PageWrapper } from '~/components/HOC'
/**
 * @info UserAll (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAll - React component.
 *
 * @since 23 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserAll = () => {
  // [TEMPLATE]

  return (
    <PageWrapper title="Users" fullWidth inlineHeader>
      <UserAdvancedTable />
    </PageWrapper>
  )
}

export default UserAll
