import PropTypes from 'prop-types'
import { Back, Col, HeadingPrimary, Row } from 'antd-styled'
import { Button, Divider } from 'antd'

/**
 * @info PageWrapper (12 Mar 2021) // CREATION DATE
 *
 * @comment PageWrapper - React HOC component using easily config wizard page
 *
 * @since 12 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @param {node}          props.children                Use to place main content under title.
 * @param {string} 				props.title										Use to set page title.
 * @param {node} 					[props.action] 								Use to add actions.
 * @param {object} 				[props.contentColProps] 			Use to config main content layout.
 *
 * @param {function} 			props.onBack 								  Callback on back button click.
 * @param {object} 				props.backBtnProps 						Properties for back button.
 *
 * @param {function} 			props.onNext 									Callback on next button click.
 * @param {object} 				props.nextBtnProps 						Properties for next button.
 *
 *
 * @return {React.FunctionComponent}
 */

const PageWrapper = (props) => {
  // [INTERFACES]
  const {
    children,
    contentColProps,
    onBack,
    backBtnProps,
    action,
    onNext,
    nextBtnProps,
    title
  } = props

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Row gutter={[8]} mb={3} justify="space-between">
          {onBack && (
            <Col>
              <Back size="large" onClick={onBack} {...backBtnProps}>
                {backBtnProps?.text ?? 'Back'}
              </Back>
            </Col>
          )}

          <Col>
            {action}
            {action && <Divider type="vertical" />}
            {onNext && (
              <Button
                size="large"
                type="primary"
                onClick={onNext}
                {...nextBtnProps}>
                {nextBtnProps?.text ?? 'Next'}
              </Button>
            )}
          </Col>
        </Row>
        <HeadingPrimary title={title} />
        <Row gutter={[8, 16]} justify="center">
          <Col sm={24} md={20} lg={16} xl={14} xxl={10} {...contentColProps}>
            {children}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

// [PROPTYPES]
PageWrapper.propTypes = {
  children: PropTypes.node,
  contentColProps: PropTypes.object,
  onBack: PropTypes.func,
  backBtnProps: PropTypes.shape({
    text: PropTypes.string
  }),
  action: PropTypes.node,
  onNext: PropTypes.func,
  nextBtnProps: PropTypes.shape({
    text: PropTypes.string
  }),
  title: PropTypes.string
}

export default PageWrapper
