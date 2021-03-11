import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

/**
 * @info MaterialSimpleForm (10 Mar 2021) // CREATION DATE
 *
 * @comment MaterialSimpleForm - React component.
 *
 * @since 11 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MaterialSimpleForm = (props) => {
  // [INTERFACES]
  const { onFinish, onFinishFailed } = props

  // [TEMPLATE]
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="inline"
      size="large">
      <Form.Item
        style={{ flex: 1 }}
        name="url"
        rules={[
          { required: true, message: 'First enter link to material.' },
          { type: 'url', message: 'You can enter only links here.' }
        ]}>
        <Input placeholder="Enter link to material..." />
      </Form.Item>
      <Form.Item noStyle>
        <Button htmlType="submit" type="primary">
          Add Link
        </Button>
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
MaterialSimpleForm.propTypes = {
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func
}

export default MaterialSimpleForm
