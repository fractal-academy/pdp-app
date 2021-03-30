import PropTypes from 'prop-types'
import { DatePicker, Form, Input } from 'antd'

/**
 * @info PlanAdvancedForm (29 Mar 2021) // CREATION DATE
 *
 * @comment PlanAdvancedForm - React component.
 *
 * @since 29 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAdvancedForm = (props) => (
  <Form size="large" requiredMark={false} {...props}>
    <Form.Item name="name" label="Name">
      <Input placeholder="Enter plan name" />
    </Form.Item>
    <Form.Item
      name="deadline"
      label="Deadline"
      style={{ flex: 1 }}
      rules={[{ required: true, message: 'Please select deadline date' }]}>
      <DatePicker style={{ display: 'flex' }} />
    </Form.Item>
  </Form>
)

// [PROPTYPES]
PlanAdvancedForm.propTypes = {
  props: PropTypes.object
}

export default PlanAdvancedForm
