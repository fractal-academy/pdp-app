import PropTypes from 'prop-types'
import { TechnologySimpleView } from '../'
import { SkillSimpleView } from 'domains/Skill/components/views'
import { Typography } from 'antd'
import { Box } from 'antd-styled'
const { Text } = Typography

/**
 * @info TechnologyAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedView - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedView = (props) => {
  // [INTERFACES]
  const { technologyId, skillId } = props

  // [TEMPLATE]
  return (
    <>
      <TechnologySimpleView technologyId={technologyId} />
      <Box mt={2}>
        <SkillSimpleView skillId={skillId} />
        <Text>{` skill`}</Text>
      </Box>
    </>
  )
}

// [PROPTYPES]
TechnologyAdvancedView.propTypes = {
  technologyId: PropTypes.string.isRequired,
  skillId: PropTypes.string.isRequired
}

export default TechnologyAdvancedView
