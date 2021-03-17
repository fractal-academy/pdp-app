import PropTypes from 'prop-types'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { TechnologySimpleList } from 'domains/Technology/components/lists'
import { Spinner } from '~/components'

/**
 * @info TechnologyAdvancedList (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAdvancedList - React component.
 *
 * @since 17 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologyAdvancedList = (props) => {
  // [INTERFACES]
  const { refCollectionTechnologies, refCollectionMaterials, extra } = props

  // [ADDITIONAL_HOOKS]
  const [technologies, loading] = useCollectionData(
    firestore.collection(refCollectionTechnologies)
  )

  if (loading) {
    return <Spinner />
  }
  // [TEMPLATE]
  return (
    <TechnologySimpleList
      extra={extra}
      refCollectionMaterials={refCollectionMaterials}
      technologies={technologies}
    />
  )
}

// [PROPTYPES]
TechnologyAdvancedList.propTypes = {
  refCollectionTechnologies: PropTypes.string.isRequired,
  refCollectionMaterials: PropTypes.string.isRequired,
  extra: PropTypes.bool
}

export default TechnologyAdvancedList
