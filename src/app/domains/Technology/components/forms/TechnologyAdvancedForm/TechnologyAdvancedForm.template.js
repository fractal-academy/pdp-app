import PropTypes from 'prop-types'
import { Box } from 'antd-styled'
import { Input, Form, Button, Space, Typography } from 'antd'
import { SkillSingleSelect } from '~/app/domains/Skill/components/selects'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { LevelTreeSingleSelect } from 'domains/Level/components/combined/tree'
import { useState } from 'react'
const { Text } = Typography
/**
 * @info TechnologyAdvancedForm (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedForm - React component.
 *
 * @since 11 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedForm = (props) => {
  // [INTERFACES]
  const { Buttons, onSubmit } = props

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  const [technologyId, setTechnologyId] = useState()

  // [HELPER_FUNCTIONS]
  const onSkillSelect = (value) => {
    form.setFieldsValue({ skillName: value })
  }

  // [TEMPLATE]
  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Item
        name="technologyName"
        label="Technology name: "
        rules={[
          {
            required: true,
            message: 'Please input technology name'
          }
        ]}>
        <Input placeholder="Enter name of technology" />
      </Form.Item>
      <Box display="flex" justifyContent="center">
        <SkillSingleSelect
          name="skillName"
          label="Select skill"
          rules={[{ required: true, message: 'Select skill ' }]}
          onSkillSelect={onSkillSelect}
        />
      </Box>
      <Box marginBottom={2} display="flex" justifyContent="center">
        <Text>Required technologies: </Text>
      </Box>
      <Form.List name="requiredTechnologies">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <Box display="flex" justifyContent="center">
                <Space key={field.key} align="baseline">
                  <LevelTreeSingleSelect
                    {...field}
                    rules={[{ required: true, message: 'Select technology' }]}
                    name={[field.name, 'technology']}
                    fieldKey={[field.fieldKey, 'technology']}
                  />
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              </Box>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add()
                  setTechnologyId('')
                }}
                block
                icon={<PlusOutlined />}>
                Add required technology
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Box display="flex" justifyContent="flex-end">
        <Form.Item>
          <Buttons />
        </Form.Item>
      </Box>
    </Form>
  )
}

// [PROPTYPES]
TechnologyAdvancedForm.propTypes = {
  onSubmit: PropTypes.func,
  Buttons: PropTypes.func
}

export default TechnologyAdvancedForm
