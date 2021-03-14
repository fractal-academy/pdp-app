import { TechnologyAdvancedForm } from 'domains/Technology/components/forms'
import { PageWrapper } from '~/components/HOC'
import { useHistory } from 'react-router-dom'
import { ROUTE_PATHS } from 'app/constants'
/**
 * @info TechnologyCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyCreate - React component.
 *
 * @since 13 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyCreate = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [HELPER_FUNCTIONS]
  const onSubmit = (value) => {}

  const onNext = () => {
    history.push(ROUTE_PATHS.TODO_CREATE)
  }

  // [TEMPLATE]
  return (
    <PageWrapper title="Init technology" onNext={onNext}>
      <TechnologyAdvancedForm onSubmit={onSubmit} />
    </PageWrapper>
  )
}

export default TechnologyCreate
