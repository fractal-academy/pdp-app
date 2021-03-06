import PropTypes from 'prop-types'
import firestore from '~/services/Firebase/firestore/index'
import { Typography } from 'antd'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography
/**
 * @info SpecialitySimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment SpecialitySimpleView - React component.
 *
 * @since 06 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SpecialitySimpleView = (props) => {
  // [INTERFACES]
  const { specialityId } = props

  // [ADDITIONAL_HOOKS]
  const [speciality, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.SPECIALITIES).doc(specialityId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return <Text type="secondary">{speciality.name}</Text>
}

// [PROPTYPES]
SpecialitySimpleView.propTypes = {
  specialityId: PropTypes.string.isRequired
}

export default SpecialitySimpleView
