import PropTypes from 'prop-types'
import { Button } from 'antd'
import { Row, Col, Back, HeadingPrimary } from 'antd-styled'
import { TodoSimpleForm } from 'domains/Todo/components/forms'
import { TodoSimpleList } from 'domains/Todo/components/lists'

/**
 * @info TodoCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TodoCreate - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TodoCreate = (props) => {
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
    <Row>
      <Col span={24}>
        <Row gutter={[8]} mb={3} justify="space-between">
          <Col>
            <Back size="large">Back</Back>
          </Col>
          <Col>
            <Button size="large" type="primary">
              Next
            </Button>
          </Col>
        </Row>
        <HeadingPrimary title="Create ToDo" />
        <Row gutter={[8, 16]} justify="center">
          <Col span={16}>
            <TodoSimpleForm />
          </Col>
          <Col span={16}>
            <TodoSimpleList />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

// [PROPTYPES]
TodoCreate.propTypes = {}

export default TodoCreate
