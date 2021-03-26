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
 * @since 26 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompanyMultipleSelect = (props) => {
  // [INTERFACES]
  const { companyIds, ...rest } = props

  // [COMPONENT_STATE_HOOKS]
  const [selectedCompanyIds, setSelectedCompanyIds] = useState(rest.value)
  const [allCompanyIds, setAllCompanyIds] = useState()
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  useEffect(() => {
    let unsubscribe

    const fetchCompanies = async () => {
      setLoading(true)
      setAllCompanyIds([])
      unsubscribe = getCollectionRef(
        COLLECTIONS.COMPANIES
      ).onSnapshot((snapshots) =>
        setAllCompanyIds(snapshots.docs.map((snapshot) => snapshot.data().id))
      )
      setLoading(false)
    }
    fetchCompanies()
    return () => unsubscribe()
  }, [])
  !loading && console.log(selectedCompanyIds, allCompanyIds)
  // [COMPUTED_PROPERTIES]
  const filteredCompanyIds = allCompanyIds?.filter(
    (companyId) => !selectedCompanyIds?.includes(companyId)
  )

  // [HELPER_FUNCTIONS]
  const handleChange = (selectedItems) => {
    setSelectedCompanyIds(selectedItems)
    // rest.onChange?.(selectedItems)
  }
  const tagRender = (props) => {
    const { label, closable, onClose } = props

    return (
      <Tag closable={closable} onClose={onClose}>
        <CompanySimpleView companyId={label} />
      </Tag>
    )
  }

  useEffect(() => {
    console.log(selectedCompanyIds)
  }, [selectedCompanyIds])

  // [TEMPLATE]
  if (loading) return <Spinner />

  return (
    <Select
      mode="multiple"
      placeholder="Select company"
      tagRender={tagRender}
      loading={loading}
      {...rest}>
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
