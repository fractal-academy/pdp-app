import PropTypes from 'prop-types'
import { Tag, Typography } from 'antd'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography
/**
 * @info CompetenceSimpleView (07 Mar 2021) // CREATION DATE
 *
 * @comment CompetenceSimpleView - React component.
 *
 * @since 07 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompetenceSimpleView = (props) => {
  // [INTERFACES]
  const { competenceId } = props

  // [ADDITIONAL_HOOKS]
  const [competence, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.COMPETENCES).doc(competenceId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return <Tag color={competence.color}>{competence.name}</Tag>
}

// [PROPTYPES]
CompetenceSimpleView.propTypes = {
  competenceId: PropTypes.string.isRequired
}

export default CompetenceSimpleView
