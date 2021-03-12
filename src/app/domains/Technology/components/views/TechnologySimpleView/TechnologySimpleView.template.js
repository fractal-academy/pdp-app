import PropTypes from 'prop-types'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { Tag } from 'antd'
import { Title, Text } from 'antd-styled'

/**
 * @info TechnologySimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologySimpleView - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologySimpleView = (props) => {
  // [INTERFACES]
  const { technologyId, tag } = props

  // [ADDITIONAL_HOOKS]
  const [technology, loading] = useDocumentData(
    firestore.collection(COLLECTIONS.TECHNOLOGIES).doc(technologyId)
  )

  // [TEMPLATE]
  if (loading) return <Text type="secondary">loading...</Text>

  return (
    <>
      {tag ? (
        <Tag>{technology?.name}</Tag>
      ) : (
        <Title level={3}>{technology?.name}</Title>
      )}
    </>
  )
}

// [PROPTYPES]
TechnologySimpleView.propTypes = {
  technologyId: PropTypes.string.isRequired,
  tag: PropTypes.bool
}

export default TechnologySimpleView
