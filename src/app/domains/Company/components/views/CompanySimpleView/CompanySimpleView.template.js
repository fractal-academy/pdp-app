import PropTypes from 'prop-types'
import firestore from '~/services/Firebase/firestore/index'
import { Typography } from 'antd'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography

/**
 * @info CompanySimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment CompanySimpleView - React component.
 *
 * @since 06 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompanySimpleView = (props) => {
  // [INTERFACES]
  const { companyId } = props

  // [ADDITIONAL_HOOKS]
  const [company, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.COMPANIES).doc(companyId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return <Text type="secondary">{company.name}</Text>
}

// [PROPTYPES]
CompanySimpleView.propTypes = {
  companyId: PropTypes.string.isRequired
}

export default CompanySimpleView
