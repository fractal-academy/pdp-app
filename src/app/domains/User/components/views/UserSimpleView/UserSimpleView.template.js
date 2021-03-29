import PropTypes from 'prop-types'
import { Avatar, Row, Typography } from 'antd'
import { Col } from 'antd-styled'
import { UserOutlined } from '@ant-design/icons'
import { useHistory, generatePath } from 'react-router-dom'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { Spinner } from '~/components'
const { Title, Text } = Typography

/**
 * @info UserSimpleView (05 Mar 2021) // CREATION DATE
 *
 * @comment UserSimpleView - React component.
 *
 * @since 27 Mar 2021 ( v.0.0.7 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserSimpleView = (props) => {
  // [INTERFACES]
  const { id, withAvatar, withEmail } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const [userData, loading] = useDocumentData(
    firestore.doc(`${COLLECTIONS.USERS}/${id}`)
  )

  // [COMPUTED_PROPERTIES]
  const userDisplayName =
    userData?.firstName || userData?.secondName
      ? `${userData?.firstName ?? ''} ${userData?.secondName ?? ''}`
      : userData?.email

  // [TEMPLATE]
  if (loading) return <Spinner />

  return (
    <Row
      gutter={[16, 0]}
      align="middle"
      onClick={() => history.push(generatePath(ROUTE_PATHS.USER_SHOW, { id }))}>
      {withAvatar && (
        <Col cursor="pointer">
          <Avatar
            src={userData?.avatarURL}
            size="large"
            icon={<UserOutlined />}
          />
        </Col>
      )}
      {withEmail ? (
        <Col>
          <Text type="secondary">{userData?.email}</Text>
        </Col>
      ) : (
        <Col>
          <Title level={5}>{userDisplayName}</Title>
        </Col>
      )}
    </Row>
  )
}

// [PROPTYPES]
UserSimpleView.propTypes = {
  id: PropTypes.string,
  withAvatar: PropTypes.bool,
  withEmail: PropTypes.bool
}

export default UserSimpleView
