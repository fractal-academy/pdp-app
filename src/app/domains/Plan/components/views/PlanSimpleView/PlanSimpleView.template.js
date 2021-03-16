import PropTypes from 'prop-types'
import { Box } from 'antd-styled'
import { Typography, Space } from 'antd'
import { Status } from '~/components'
import { FieldTimeOutlined } from '@ant-design/icons'
import moment from 'moment'
const { Text, Title } = Typography
/**
 * @info PlanSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanSimpleView - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanSimpleView = (props) => {
  // [INTERFACES]
  const { name, status, period } = props

  // [TEMPLATE]
  return (
    <Box display="flex" justifyContent="space-between">
      <Space size="large" align="start">
        <Title display="inline-block" level={3}>
          {name}
        </Title>
        <Status status={status} />
      </Space>
      <Space align="start">
        <FieldTimeOutlined />
        <Text display="inline-block">
          {moment(period?.end).format('DD.MM.YYYY')}
        </Text>
      </Space>
    </Box>
  )
}

// [PROPTYPES]
PlanSimpleView.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  period: PropTypes.object
}

export default PlanSimpleView
