import PropTypes from 'prop-types'
import { Typography } from 'antd'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text, Title } = Typography
/**
 * @info CompetenceSimpleView (07 Mar 2021) // CREATION DATE
 *
 * @comment CompetenceSimpleView - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
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

  return <Title level={3}>{competence.name}</Title>
}

// [PROPTYPES]
CompetenceSimpleView.propTypes = {
  competenceId: PropTypes.string.isRequired
}

export default CompetenceSimpleView
