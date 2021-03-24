import PropTypes from 'prop-types'
import { List, Typography, Space } from 'antd'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { CompanySimpleView } from 'domains/Company/components/views'
const { Text } = Typography

/**
 * @info CompanySimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment CompanySimpleList - React component.
 *
 * @since 24 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompanySimpleList = (props) => {
  // [INTERFACES]
  const { companyIds } = props

  // [ADDITIONAL_HOOKS]
  const [companies, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.COMPANIES).where('id', 'in', companyIds)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>
  if (!companies) return <Text type="secondary">no company</Text>
  return (
    <List dataSource={companies}>
      <Space>
        {companies.map((company) => (
          <CompanySimpleView name={company.name} />
        ))}
      </Space>
    </List>
  )
}

// [PROPTYPES]
CompanySimpleList.propTypes = {
  companyIds: PropTypes.array
}

export default CompanySimpleList
