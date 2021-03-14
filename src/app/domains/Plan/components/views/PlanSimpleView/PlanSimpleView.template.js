import PropTypes from 'prop-types'
import firestore from '~/services/Firebase/firestore/index'
import { Typography } from 'antd'
import { Box } from 'antd-styled'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Title, Text } = Typography
/**
 * @info PlanSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanSimpleView - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanSimpleView = (props) => {
  // [INTERFACES]
  const { planId, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const [plan, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.PLANS).doc(planId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <Box display="inline-block" {...rest}>
      <Title level={3}>{plan.name}</Title>
    </Box>
  )
}

// [PROPTYPES]
PlanSimpleView.propTypes = {
  planId: PropTypes.string.isRequired
}

export default PlanSimpleView
