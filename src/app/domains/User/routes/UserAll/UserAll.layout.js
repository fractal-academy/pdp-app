import { UserAdvancedTable } from 'domains/User/components/tables'
import { PageWrapper } from '~/components/HOC'
/**
 * @info UserAll (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAll - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserAll = () => {
  // [TEMPLATE]

  return (
    <PageWrapper
      title="Users"
      fullWidth
      inlineHeader
      nextBtnProps={{ text: 'Add user' }}
      onNext={() => console.log()}>
      <UserAdvancedTable />
    </PageWrapper>
  )
}

export default UserAll
