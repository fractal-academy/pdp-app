import PropTypes from 'prop-types'
import { Box, Col, Row } from 'antd-styled'
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
      <Row alignItems="center">
        <Col>
          <Title style={{ margin: 0 }} level={3}>
            {name}
          </Title>
        </Col>
        <Col>
          <Status status={status} />
        </Col>
      </Row>

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
