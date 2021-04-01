import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { DatePicker, Form, Input, Typography } from 'antd'
import { Col, Row } from 'antd-styled'

/**
 * @info PlanAdvancedForm (29 Mar 2021) // CREATION DATE
 *
 * @comment PlanAdvancedForm - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAdvancedForm = (props) => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  const historyState = history.location.state

  // [TEMPLATE]
  return (
    <Form
      size="large"
      requiredMark={false}
      initialValues={{
        ...historyState.formData,
        deadline: moment(historyState?.formData?.deadline)
      }}
      onValuesChange={(_, allValues) => {
        history.replace(history.location.pathname, {
          ...historyState,
          formData: {
            ...allValues,
            deadline: allValues?.deadline?.toDate()
          }
        })
      }}
      preserve={false}
      {...props}>
      <Form.Item
        name="name"
        // label="Name"
        rules={[{ required: true, message: 'Please enter plan name' }]}>
        <Input placeholder="Enter plan name" />
      </Form.Item>
      <Row alignItems="center" justifyContent="flex-end" mb={24}>
        <Col>
          <Form.Item
            name="deadline"
            label="Deadline"
            style={{ flex: 1, marginBottom: '0px' }}
            rules={[
              { required: true, message: 'Please select deadline date' }
            ]}>
            <DatePicker
              style={{ display: 'flex' }}
              placeholder="Deadline"
              disabledDate={(currentDate) => {
                const date = new Date()
                return currentDate.toDate() < date.setDate(date.getDate() - 1)
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
// [PROPTYPES]
PlanAdvancedForm.propTypes = {
  props: PropTypes.object
}

export default PlanAdvancedForm
