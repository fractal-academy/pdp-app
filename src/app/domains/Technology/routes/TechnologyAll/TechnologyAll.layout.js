import { TechnologySimpleList } from 'domains/Technology/components/lists'
import { useHistory } from 'react-router-dom'
import { ROUTE_PATHS } from 'app/constants'
import { PageTitle } from '~/components'
import { Button } from 'antd'

/**
 * @info TechnologyAll (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAll - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_DATA = [{ technologyId: 'LCpboRsqU6zvWYRirBOD', skillId: '789' }]

const TechnologyAll = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [HELPER_FUNCTIONS]
  const addTechnology = () => {
    history.push(ROUTE_PATHS.TECHNOLOGY_CREATE)
  }
  const AddButton = () => {
    return (
      <Button type="primary" onClick={addTechnology}>
        Add technology
      </Button>
    )
  }
  // [TEMPLATE]
  return (
    <>
      <PageTitle title="Technologies" action={<AddButton />} />
      <TechnologySimpleList data={MOCK_DATA} />
    </>
  )
}

export default TechnologyAll
