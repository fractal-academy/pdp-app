import PropTypes from 'prop-types'
import { LevelAdvancedView } from 'domains/Level/components/views'
import { CompetenceSimpleView } from 'domains/Competence/components/views'
import { Box } from 'antd-styled'
/**
 * @info CompetenceAdvancedView (05 Mar 2021) // CREATION DATE
 *
 * @comment CompetenceAdvancedView - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompetenceAdvancedView = (props) => {
  // [INTERFACES]
  const { competenceId, levelId, subLevelId } = props

  // [TEMPLATE]
  return (
    <Box>
      <CompetenceSimpleView competenceId={competenceId} />
      <LevelAdvancedView levelId={levelId} subLevelId={subLevelId} />
    </Box>
  )
}

// [PROPTYPES]
CompetenceAdvancedView.propTypes = {
  competenceId: PropTypes.string.isRequired,
  levelId: PropTypes.string,
  subLevelId: PropTypes.string
}

export default CompetenceAdvancedView
