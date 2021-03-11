import PropTypes from 'prop-types'
import { Content, Sider, Title } from 'antd-styled'
/**
 * @info PlanAll (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanAll - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAll = (props) => {
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
    <>
      <Content bg="#ffffff" paddingTop={4} paddingX={4}>
        <Title>Plans</Title>
      </Content>
      <Sider paddingTop={4} paddingX={4}>
        <Title textAlign="center" style={{ color: 'white' }}>
          Todo
        </Title>
      </Sider>
    </>
  )
}

// [PROPTYPES]
PlanAll.propTypes = {}

export default PlanAll
