import PropTypes from 'prop-types'
import firestore from '~/services/Firebase/firestore/index'
import { Typography } from 'antd'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography
/**
 * @info CompetenceSimpleView (07 Mar 2021) // CREATION DATE
 *
 * @comment CompetenceSimpleView - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompetenceSimpleView = (props) => {
  // [INTERFACES]
  const { competenceId, name } = props

  // [ADDITIONAL_HOOKS]
  const [competence, loading] = useDocumentData(
    !name &&
      firestore.collection(COLLECTIONS.COMPETENCES).doc(competenceId ?? ' ')
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>
  if (!competence) return <Text type="secondary">no competence</Text>
  return <Text type="secondary">{name || competence?.name}</Text>
}

// [PROPTYPES]
CompetenceSimpleView.propTypes = {
  competenceId: PropTypes.string,
  name: PropTypes.string
}

export default CompetenceSimpleView
