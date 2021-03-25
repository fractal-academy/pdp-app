import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Select, Tag } from 'antd'
import { getCollectionRef } from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Spinner } from '~/components'
import { CompanySimpleView } from 'domains/Company/components/views'

/**
 * @info CompanyMultipleSelect (25 Mar 2021) // CREATION DATE
 *
 * @comment CompanyMultipleSelect - React component.
 *
 * @since 25 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompanyMultipleSelect = (props) => {
  // [INTERFACES]
  const { companyIds } = props

  // [COMPONENT_STATE_HOOKS]
  const [selectedCompanyIds, setSelectedCompanyIds] = useState(companyIds)
  const [companyAllIds, setCompanyAllIds] = useState()
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  useEffect(() => {
    let unsubscribe

    const fetchCompanies = async () => {
      setLoading(true)
      setCompanyAllIds([])
      unsubscribe = getCollectionRef(
        COLLECTIONS.COMPANIES
      ).onSnapshot((snapshots) =>
        setCompanyAllIds(snapshots.docs.map((snapshot) => snapshot.data().id))
      )
      setLoading(false)
    }
    fetchCompanies()
    return () => unsubscribe()
  }, [])

  // [HELPER_FUNCTIONS]
  const filteredCompanyIds = companyAllIds?.filter(
    (companyId) => !selectedCompanyIds.includes(companyId)
  )

  const handleChange = (selectedItems) => {
    setSelectedCompanyIds(selectedItems)
  }
  const tagRender = (props) => {
    const { label, closable, onClose } = props

    return (
      <Tag closable={closable} onClose={onClose}>
        <CompanySimpleView companyId={label} />
      </Tag>
    )
  }

  // [TEMPLATE]
  if (loading) return <Spinner />

  return (
    <Select
      mode="multiple"
      placeholder="Select company"
      value={selectedCompanyIds}
      onChange={handleChange}
      tagRender={tagRender}
      loading={loading}>
      {filteredCompanyIds?.map((id) => (
        <Select.Option key={id} value={id}>
          <CompanySimpleView companyId={id} />
        </Select.Option>
      ))}
    </Select>
  )
}

// [PROPTYPES]
CompanyMultipleSelect.propTypes = {
  companyIds: PropTypes.array.isRequired
}

export default CompanyMultipleSelect
