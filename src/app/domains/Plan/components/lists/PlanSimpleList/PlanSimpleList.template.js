import PropTypes from 'prop-types'
import { List, Collapse } from 'antd'
import { Box } from 'antd-styled'
import { TechnologyAdvancedView } from 'domains/Technology/components/views'
import { getGrid } from '~/utils'
import { PlanAdvancedView } from 'domains/Plan/components/views'
const { Panel } = Collapse

/**
 * @info PlanSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanSimpleList - React component.
 *
 * @since 15 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanSimpleList = (props) => {
  // [INTERFACES]
  const { data } = props

  // [TEMPLATE]
  return (
    <Collapse expandIconPosition="right" ghost accordion>
      {data.map((plan) => (
        <Panel header={<PlanAdvancedView planId={plan.id} />} key={plan.id}>
          <List
            grid={{
              gutter: 16,
              ...getGrid({ xs: 1 })
            }}
            dataSource={Object.keys(plan.technologyIds)}
            renderItem={(technology) => (
              <List.Item>
                <Box p={10}>
                  <TechnologyAdvancedView technologyId={technology} />
                </Box>
              </List.Item>
            )}
          />
        </Panel>
      ))}
    </Collapse>
  )
}

// [PROPTYPES]
PlanSimpleList.propTypes = {
  data: PropTypes.array.isRequired
}

export default PlanSimpleList
