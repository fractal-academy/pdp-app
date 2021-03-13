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
 * @param {boolean}       props.inlineHeader            Use to set title and actions in one row
 * @param {boolean}       props.fullWidth               Set full witdh for main content
 * @param {object}        props.titleProps              Use to confit title component
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
    inlineHeader,
    fullWidth,
    title,
    titleProps
  } = props

  const actionBlock = (
    <>
      {inlineHeader && action && <Divider type="vertical" />}
      {action}
      {action && <Divider type="vertical" />}
    </>
  )

  const buttonsBlock = (
    <>
      {onBack && (
        <Col>
          <Back size="large" onClick={onBack} {...backBtnProps}>
            {backBtnProps?.text ?? 'Back'}
          </Back>
        </Col>
      )}

      {inlineHeader && action && <Col>{actionBlock}</Col>}

      <Col>
        {!inlineHeader && action && actionBlock}
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
    </>
  )

  // [TEMPLATE]
  return (
    <Row>
      <Col span={24}>
        <Row gutter={[8]} mb={3} justify="space-between">
          {inlineHeader ? (
            <>
              <Col flex={1}>
                <HeadingPrimary
                  title={title}
                  textAlign="left"
                  {...titleProps}
                />
              </Col>
              {buttonsBlock}
            </>
          ) : (
            buttonsBlock
          )}
        </Row>
        {!inlineHeader && <HeadingPrimary title={title} {...titleProps} />}
        <Row gutter={[8, 16]} justify="center">
          <Col
            sm={24}
            md={fullWidth ? 24 : 20}
            lg={fullWidth ? 24 : 16}
            xl={fullWidth ? 24 : 14}
            xxl={fullWidth ? 24 : 10}
            {...contentColProps}>
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
  title: PropTypes.string,
  titleProps: PropTypes.object,
  inlineHeader: PropTypes.bool,
  fullWidth: PropTypes.bool
}

export default PageWrapper
