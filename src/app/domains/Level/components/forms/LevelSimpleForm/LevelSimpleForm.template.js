import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { AutoComplete, Button, Form, Input } from 'antd'
import { Row, Col } from 'antd-styled'
import { TypeSingleSelect } from 'domains/Type/components/selects'
import _ from 'lodash'

/**
 * @info LevelSimpleForm (05 Mar 2021) // CREATION DATE
 *
 * @comment LevelSimpleForm - React component using for creating presets of level.
 *
 * @since 20 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @param {boolean}       props.disable           Use to disable all fields in this form(Ex. when submit is async).
 * @param {function}      props.onFinish          Run when form is submitted.
 * @param {function}      props.onLevelAdd        Run when new level was added.
 *
 * @return {ReactComponent}
 */

const LevelSimpleForm = (props) => {
  // [INTERFACES]
  const { onFinish, onLevelAdd, disable, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [COMPONENT_STATE_HOOKS]
  const [values, setValues] = useState({})
  const [options, setOptions] = useState([])

  // [HELPER_FUNCTIONS]
  const onSubmit = async (data) => {
    await onFinish(data, values)
    setValues({})
    setOptions([])
    form.resetFields()
  }
  const onAdd = (data) => {
    const { level, subLevel } = data
    const buf = { ...values }
    buf[level] = buf[level] ?? []

    // Add sub levels to level & Exclusion sub level duplicates
    if (subLevel && !buf[level].includes(subLevel)) {
      buf[level] = buf[level].length ? [...buf[level], subLevel] : [subLevel]
    }

    setValues(buf)

    // Exclusion level duplicates
    setOptions(_.uniqBy([...options, { value: level }], 'value'))
  }

  // [USE_EFFECTS]
  useEffect(() => onLevelAdd && onLevelAdd(values, setValues), [
    values,
    setValues
  ])

  // [TEMPLATE]
  return (
    <>
      <Form requiredMark={false} onFinish={onSubmit} {...rest}>
        <Row gutter={[8, 8]}>
          <Col flex={1}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter name.' }]}>
              <Input disabled={disable} placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item name="type" label="Type">
              <TypeSingleSelect disabled={disable} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Form
        form={form}
        onFinish={onAdd}
        layout="inline"
        validateTrigger="onSubmit">
        <Form.Item
          name="level"
          rules={[{ required: true, message: 'Enter or select level name' }]}
          style={{ flex: 1 }}>
          <AutoComplete
            disabled={disable}
            options={options}
            onSelect={() => form.validateFields(['level'])}
            placeholder="Type level name"
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="subLevel"
          rules={[{ required: true, message: 'Enter sub level name' }]}
          style={{ flex: 1 }}>
          <Input disabled={disable} placeholder="Type sublevel name" />
        </Form.Item>
        <Form.Item noStyle>
          <Button disabled={disable} type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

// [PROPTYPES]
LevelSimpleForm.propTypes = {
  onFinish: PropTypes.func,
  onLevelAdd: PropTypes.func,
  disable: PropTypes.bool
}

export default LevelSimpleForm
