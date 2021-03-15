import PropTypes from 'prop-types'
import { Box } from 'antd-styled'
import { Typography, Space } from 'antd'
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
 * @since 16 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
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
      <Space size="large" align="start">
        <PlanSimpleView name={plan.name} />
        <Status status={plan.status} />
      </Space>
      <Space align="start">
        <FieldTimeOutlined />
        <Text display="inline-block">
          {moment(plan?.period?.end).format('DD.MM.YYYY')}
        </Text>
      </Space>
    </Box>
  )
}

// [PROPTYPES]
PlanAdvancedView.propTypes = {
  planId: PropTypes.string.isRequired
}

export default PlanAdvancedView
