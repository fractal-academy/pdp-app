import PropTypes from 'prop-types'
import { Collapse } from 'antd'
import { TechnologyAdvancedList } from 'domains/Technology/components/lists'
import { PlanAdvancedView } from 'domains/Plan/components/views'
import { COLLECTIONS } from 'app/constants'
const { Panel } = Collapse

/**
 * @info PlanSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanSimpleList - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.5) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanSimpleList = (props) => {
  // [INTERFACES]
  const { plans, setActivePlanId } = props

  // [HELPER_FUNCTIONS]
  const onPlanChange = (planId) => {
    setActivePlanId(planId)
  }

  // [TEMPLATE]
  return (
    <Collapse
      expandIconPosition="right"
      ghost
      accordion
      onChange={onPlanChange}>
      {plans?.map((plan) => (
        <Panel header={<PlanAdvancedView plan={plan} />} key={plan.id}>
          <TechnologyAdvancedList
            refCollectionTechnologies={`${COLLECTIONS.PLANS}/${plan.id}/${COLLECTIONS.TECHNOLOGIES}`}
            refCollectionMaterials={`${COLLECTIONS.PLANS}/${plan.id}/${COLLECTIONS.MATERIALS}`}
          />
        </Panel>
      ))}
    </Collapse>
  )
}

// [PROPTYPES]
PlanSimpleList.propTypes = {
  plans: PropTypes.array.isRequired,
  setActivePlanId: PropTypes.func.isRequired
}

export default PlanSimpleList
