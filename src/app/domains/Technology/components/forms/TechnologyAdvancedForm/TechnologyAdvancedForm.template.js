import PropTypes from 'prop-types'
import { useState } from 'react'
import { Input, Form } from 'antd'
import { LevelSelectWithCreate } from 'domains/Level/components/combined/selects'
import { TypeSingleSelect } from 'domains/Type/components/selects'
import { TYPES_VALUES } from '~/constants'

/**
 * @info TechnologyAdvancedForm (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedForm - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.8 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedForm = (props) => {
  // [INTERFACES]
  const {
    onSubmit,
    form,
    defaultValues,
    onPresetSelect,
    resetLevel,
    ...rest
  } = props

  // [COMPONENT_STATE_HOOKS]
  const [prevPreset, setPrevPreset] = useState('')
  const [selectedType, setSelectedType] = useState(
    defaultValues?.type || form.getFieldValue('type') || TYPES_VALUES[0]
  )

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
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input technology name.'
          }
        ]}>
        <Input placeholder="Enter name of technology" />
      </Form.Item>
      <Form.Item name="type" initialValue={selectedType} label="Type">
        <TypeSingleSelect
          onSelect={(type) => {
            if (type) {
              setSelectedType(type)
              resetLevel()
              form.setFieldsValue({ type })
              form.resetFields(['levelPresetId'])
            }
          }}
        />
      </Form.Item>
      <Form.Item
        name="levelPresetId"
        label="Level preset"
        rules={[{ required: true, message: 'Select levels preset' }]}>
        <LevelSelectWithCreate
          levelType={selectedType}
          onSelect={(presetId) => {
            if (presetId && presetId !== prevPreset) {
              setPrevPreset(presetId)
              onPresetSelect(presetId)
            }
          }}
        />
      </Form.Item>
    </Form>
  )
}

// [PROPTYPES]
TechnologyAdvancedForm.propTypes = {
  onSubmit: PropTypes.func,
  defaultValues: PropTypes.object,
  onPresetSelect: PropTypes.func,
  resetLevel: PropTypes.func
}

export default TechnologyAdvancedForm
