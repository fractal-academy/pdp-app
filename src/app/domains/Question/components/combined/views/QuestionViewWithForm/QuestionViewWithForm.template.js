import PropTypes from 'prop-types'
import { List, Tag } from 'antd'
import { Row, Col } from 'antd-styled'
import { QuestionSimpleForm } from 'domains/Question/components/forms'

/**
 * @info QuestionViewWithForm (05 Mar 2021) // CREATION DATE
 *
 * @comment QuestionViewWithForm - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const QuestionViewWithForm = (props) => {
  // [INTERFACES]
  const { question, isEdit, ...rest } = props

  // [TEMPLATE]
  return (
    <>
      {isEdit ? (
        <Row flex={1}>
          <Col span={24}>
            <QuestionSimpleForm
              data={question}
              defaultValue={question.name}
              {...rest}
            />
          </Col>
        </Row>
      ) : (
        <>
          <List.Item.Meta title={question.name} />
          {question.readOnly && <Tag color="warning">From Template</Tag>}
        </>
      )}
    </>
  )
}

// [PROPTYPES]
QuestionViewWithForm.propTypes = {
  question: PropTypes.object,
  isEdit: PropTypes.bool,
  onFinish: PropTypes.func
}

export default QuestionViewWithForm
