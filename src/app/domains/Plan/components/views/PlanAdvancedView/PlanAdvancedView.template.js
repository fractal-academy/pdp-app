import PropTypes from 'prop-types'
import { Box } from 'antd-styled'
import { Typography } from 'antd'
import { PlanSimpleView } from 'domains/Plan/components/views'
import { Status } from '~/components'
import { FieldTimeOutlined } from '@ant-design/icons'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import moment from 'moment'
const { Text } = Typography
/**
 * @info PlanAdvancedView (14 Mar 2021) // CREATION DATE
 *
 * @comment PlanAdvancedView - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAdvancedView = (props) => {
  // [INTERFACES]
  const { planId } = props

  // [ADDITIONAL_HOOKS]
  const [plan, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.PLANS).doc(planId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <PlanSimpleView planId={plan.id} mr={4} />
        <Status status={plan.status} />
      </Box>
      <Box>
        <FieldTimeOutlined />
        <Box ml={1} display="inline-block">
          <Text>{moment(plan?.period?.end).format('DD.MM.YYYY')}</Text>
        </Box>
      </Box>
    </Box>
  )
}

// [PROPTYPES]
PlanAdvancedView.propTypes = {
  planId: PropTypes.string.isRequired
}

export default PlanAdvancedView
