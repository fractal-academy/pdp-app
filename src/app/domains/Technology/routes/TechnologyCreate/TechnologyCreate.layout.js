import { PageWrapper, Card, Title, Box } from 'antd-styled'
import { Button } from 'antd'
import { TechnologyAdvancedForm } from 'domains/Technology/components/forms'
/**
 * @info TechnologyCreate (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyCreate - React component.
 *
 * @since 11 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyCreate = () => {
  // [HELPER_FUNCTIONS]
  const onSubmit = (values) => {
    let requiredTechnologies = {}
    values.requiredTechnologies.forEach((tech) => {
      requiredTechnologies = {
        ...requiredTechnologies,
        [Object.values(tech)[0][0]]: {
          levelId: Object.values(tech)[0][1],
          sublevelId: Object.values(tech)[0][2]
        }
      }
    })
    console.log('requiredTechnologies', requiredTechnologies)
  }

  // [TEMPLATE]
  const Buttons = () => (
    <Button type="primary" htmlType="submit">
      Next
    </Button>
  )

  return (
    <PageWrapper alignMiddle>
      <Card>
        <Box mb={4}>
          <Title level={2} display="flex" justifyContent="center">
            Init technology
          </Title>
        </Box>
        <TechnologyAdvancedForm Buttons={Buttons} onSubmit={onSubmit} />
      </Card>
    </PageWrapper>
  )
}

// [PROPTYPES]
TechnologyCreate.propTypes = {}

export default TechnologyCreate
