import PropTypes from 'prop-types'
import { Box } from 'antd-styled'
import { List, Collapse } from 'antd'
import { Spinner } from '~/components'
import { TechnologyAdvancedView } from 'domains/Technology/components/views'
import { getGrid } from '~/utils'
import { PlanSimpleView } from 'domains/Plan/components/views'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Panel } = Collapse
/**
 * @info PlanAdvancedView (14 Mar 2021) // CREATION DATE
 *
 * @comment PlanAdvancedView - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAdvancedView = (props) => {
  // [INTERFACES]
  const { plan } = props

  // [ADDITIONAL_HOOKS]
  const [technologies, loadingTechnologies] = useCollectionData(
    firestore.collection(
      `${COLLECTIONS.PLANS}/${plan.id}/${COLLECTIONS.TECHNOLOGIES}`
    )
  )

  // [TEMPLATE]
  return (
    <Panel
      header={
        <PlanSimpleView
          name={plan.name}
          status={plan.status}
          period={plan.period}
        />
      }
      key={plan.id}>
      {loadingTechnologies ? (
        <Spinner />
      ) : (
        <List
          grid={{
            gutter: 16,
            ...getGrid({ xs: 1 })
          }}
          dataSource={Object.values(technologies)}
          renderItem={(technology) => (
            <List.Item>
              <Box p={10}>
                <TechnologyAdvancedView
                  technologyId={technology.id}
                  refDoc={`${COLLECTIONS.PLANS}/${plan.id}/${COLLECTIONS.TECHNOLOGIES}/${technology.id}`}
                />
              </Box>
            </List.Item>
          )}
        />
      )}
    </Panel>
  )
}

// [PROPTYPES]
PlanAdvancedView.propTypes = {
  plan: PropTypes.object.isRequired
}

export default PlanAdvancedView
