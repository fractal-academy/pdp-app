import PropTypes from 'prop-types'
import { List } from 'antd'
import { Remove, Edit } from 'antd-styled'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
/**
 * @info TodoSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoSimpleList - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_DATA = ['first', 'second', 'third', 'fourth', 'fifth']

const TodoSimpleList = (props) => {
  // [INTERFACES]
  /*
  code sample:
  const { data } = props
  */

  // [ADDITIONAL_HOOKS]
  /*
  code sample:
  const firestore = useFirestore()
  */

  // [COMPONENT_STATE_HOOKS]
  /*
  code sample:
  const singleton = useRef(true) // references also put here
  const [state, setState] = useState({})
  */

  // [HELPER_FUNCTIONS]

  // [COMPUTED_PROPERTIES]
  /*
    code sample:
    const userDisplayName = user.firstName + user.lastName
  */

  // [USE_EFFECTS]

  // [TEMPLATE]
  return (
    <List
      size="large"
      dataSource={MOCK_DATA}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Edit icon={<EditOutlined />} />,
            <Remove icon={<DeleteOutlined />} />
          ]}>
          <div>{item}</div>
        </List.Item>
      )}
    />
  )
}

// [PROPTYPES]
TodoSimpleList.propTypes = {}

export default TodoSimpleList
