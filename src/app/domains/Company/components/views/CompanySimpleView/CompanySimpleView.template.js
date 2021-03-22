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
 * @since 22 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompanySimpleView = (props) => {
  // [INTERFACES]
  const { name, companyId } = props

  // [ADDITIONAL_HOOKS]
  const [company, loading] = useDocumentData(
    !name && firestore.collection(COLLECTIONS.COMPANIES).doc(companyId ?? ' ')
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>
  if (!company) return <Text type="secondary">no company</Text>
  return <Text type="secondary">{name || company?.name}</Text>
}

// [PROPTYPES]
CompanySimpleView.propTypes = {
  companyId: PropTypes.string,
  name: PropTypes.string
}

export default CompanySimpleView
