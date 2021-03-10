import PropTypes from 'prop-types'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { Select, Typography, Form } from 'antd'
import { useEffect, useState } from 'react'
import * as styles from './TechnologySingleSelect.style'
const { Text } = Typography

/**
 * @info TechnologySingleSelect (09 Mar 2021) // CREATION DATE
 *
 * @comment TechnologySingleSelect - React component.
 *
 * @since 10 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologySingleSelect = (props) => {
  // [INTERFACES]
  const { technology, onTechnologySelect, setTechnologyId, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const [technologies, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.TECHNOLOGIES)
  )

  // [COMPONENT_STATE_HOOKS]
  const [technologyName, setTechnologyName] = useState(technology && technology)

  // [USE_EFFECTS]
  useEffect(() => {
    onTechnologySelect && onTechnologySelect(technologyName)
  }, [])

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  if (technologies)
    return (
      <Form.Item {...rest}>
        <Select
          style={styles.technologySelectWidth}
          defaultValue={technologyName}
          onChange={(value) => setTechnologyId(value)}
          size="large">
          {technologies.map((technology) => (
            <Select.Option value={technology.id}>
              {technology.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    )
}

// [PROPTYPES]
TechnologySingleSelect.propTypes = {
  technology: PropTypes.string,
  onTechnologySelect: PropTypes.func,
  name: PropTypes.object,
  fieldKey: PropTypes.object
}

export default TechnologySingleSelect
