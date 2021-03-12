import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { COLLECTIONS } from 'app/constants'
import { Cascader } from 'antd'
import _ from 'lodash'
/**
 * @info TechnologyAdvancedCascader (11 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedCascader - React component.
 *
 * @since 11 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedCascader = (props) => {
  // [INTERFACES]
  /*
  code sample: 
  const { data } = props
  */

  // [ADDITIONAL_HOOKS]
  const [technologies, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.TECHNOLOGIES)
  )

  // [COMPONENT_STATE_HOOKS]
  const [options, setOptions] = useState([])

  // [HELPER_FUNCTIONS]
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    let levels = []

    const levelsIds = !Array.isArray(targetOption.levelIds)
      ? Object.keys(targetOption.levelIds)
      : targetOption.levelIds

    const isSublevel = Array.isArray(targetOption.levelIds)

    for (const level of levelsIds) {
      const res = await firestore
        .doc(
          `${isSublevel ? COLLECTIONS.SUB_LEVELS : COLLECTIONS.LEVELS}/${level}`
        )
        .get()
      levels.push(res.data())
    }
    targetOption.loading = false
    targetOption.children = levels.map((level) => ({
      value: level.id,
      label: level.name,
      levelIds: targetOption.levelIds[level.id],
      isLeaf: !targetOption.levelIds[level.id]?.length
    }))
    setOptions([...options])
  }

  // [COMPUTED_PROPERTIES]
  /* 
    code sample: 
    const userDisplayName = user.firstName + user.lastName
  */

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMount = true
    console.log(options)
    if (technologies && isComponentMount) {
      const techMap = technologies.map((technology) => ({
        value: technology.id,
        label: technology.name,
        levelIds: technology.levelIds,
        isLeaf: false
      }))
      setOptions(techMap)
    }
    return () => (isComponentMount = false)
  }, [technologies])

  // [TEMPLATE]
  return (
    <Cascader
      options={options}
      loadData={loadData}
      changeOnSelect
      disabled={loading}
    />
  )
}

// [PROPTYPES]
TechnologyAdvancedCascader.propTypes = {
  props: PropTypes.object
}

export default TechnologyAdvancedCascader
