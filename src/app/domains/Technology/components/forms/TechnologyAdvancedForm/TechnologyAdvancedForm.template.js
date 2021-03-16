import PropTypes from 'prop-types'
import { Input, Form } from 'antd'
import { LevelSelectWithCreate } from 'domains/Level/components/combined/selects'
import { TypeSingleSelect } from 'domains/Type/components/selects'

/**
 * @info TechnologyAdvancedForm (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedForm - React component.
 *
 * @since 16 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedForm = (props) => {
  // [INTERFACES]
  const { onSubmit, form, onPresetSelect, ...rest } = props

  // [TEMPLATE]
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      size="large"
      requiredMark={false}
      {...rest}>
      <Form.Item
        name="name"
        label="Name:"
        rules={[
          {
            required: true,
            message: 'Please input technology name.'
          }
        ]}>
        <Input placeholder="Enter name of technology" />
      </Form.Item>
      <Form.Item name="type" label="Type">
        <TypeSingleSelect />
      </Form.Item>
      <Form.Item
        name="levelIds"
        label="Level preset"
        rules={[{ required: true, message: 'Select levels preset' }]}>
        <LevelSelectWithCreate
          onSelect={(presetId) => presetId && onPresetSelect(presetId)}
        />
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
TechnologyAdvancedForm.propTypes = {
  onSubmit: PropTypes.func,
  Buttons: PropTypes.func
}

export default TechnologyAdvancedForm
