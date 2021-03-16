import PropTypes from 'prop-types'
import { useState } from 'react'
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
  const [selectedLevel, setSelectedLevel] = useState(defaultValues.type)

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
        <TypeSingleSelect
          onSelect={(value) => {
            if (value) {
              setSelectedLevel(value)
              resetLevel()
              form.resetFields(['levelIds'])
            }
          }}
        />
      </Form.Item>
      <Form.Item
        name="levelIds"
        label="Level preset"
        rules={[{ required: true, message: 'Select levels preset' }]}>
        <LevelSelectWithCreate
          levelType={selectedLevel}
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
