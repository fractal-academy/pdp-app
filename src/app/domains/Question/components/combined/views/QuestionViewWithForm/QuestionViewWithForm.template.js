import PropTypes from 'prop-types'
import { Row, Col } from 'antd-styled'
import { QuestionSimpleForm } from 'domains/Question/components/forms'
import { QuestionSimpleView } from 'domains/Question/components/views'

/**
 * @info QuestionViewWithForm (05 Mar 2021) // CREATION DATE
 *
 * @comment QuestionViewWithForm - React component.
 *
 * @since 19 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const QuestionViewWithForm = (props) => {
  // [INTERFACES]
  const { question, isEdit, changeEditState, ...rest } = props

  // [TEMPLATE]
  return (
    <Row flex={1}>
      <Col span={24}>
        {isEdit ? (
          <QuestionSimpleForm
            data={question}
            defaultValue={question.name}
            {...rest}
          />
        ) : (
          <QuestionSimpleView text={question.name} />
        )}
      </Col>
    </Row>
  )
}

// [PROPTYPES]
QuestionViewWithForm.propTypes = {
  question: PropTypes.object,
  isEdit: PropTypes.bool,
  changeEditState: PropTypes.func,
  onFinish: PropTypes.func
}

export default QuestionViewWithForm
