import PropTypes from 'prop-types'
import { Typography } from 'antd'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text, Title } = Typography
/**
 * @info TechnologySimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologySimpleView - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologySimpleView = (props) => {
  // [INTERFACES]
  const { technologyId, withHashTag } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.TECHNOLOGIES).doc(technologyId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <Title level={withHashTag ? 5 : 3}>
      {withHashTag ? `#${technology.name}` : `${technology.name}`}
    </Title>
  )
}

// [PROPTYPES]
TechnologySimpleView.propTypes = {
  technologyId: PropTypes.string.isRequired,
  withHashTag: PropTypes.bool
}

export default TechnologySimpleView
