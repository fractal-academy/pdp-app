import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useHistory, generatePath } from 'react-router-dom'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { CompetenceSimpleView } from 'domains/Competence/components/views'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { Spinner } from '~/components'
import { ROLES } from '~/constants'
import { COLLECTIONS, ROUTE_PATHS } from 'app/constants'
import _ from 'lodash'
/**
 * @info MentorSimpleTable (22 Mar 2021) // CREATION DATE
 *
 * @comment MentorSimpleTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */
let columns = [
  {
    title: 'User',
    key: 'user',
    render: (text, data) => <UserSimpleView withAvatar id={data.userId} />
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text, data) => <UserSimpleView withEmail id={data.userId} />
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (text, data) => <CompanySimpleView companyId={data?.companyId} />
  },
  {
    title: 'Competence',
    dataIndex: 'competence',
    key: 'competence',
    render: (text, data) => (
      <CompetenceSimpleView competenceId={data?.competenceIds?.[0]} />
    )
  }
]

const MentorSimpleTable = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const [mentorsData] = useCollectionData(
    firestore.collection(COLLECTIONS.MENTORS)
  )

  // [COMPONENT_STATE_HOOKS]
  const [userData, setUserData] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)

  // [USE_EFFECTS]
  useEffect(() => {
    if (mentorsData) {
      const fetchUser = async () => {
        setUsersLoading(true)
        const usersSnapshot = await firestore
          .collection(COLLECTIONS.USERS)
          .where('role', '==', ROLES.MENTOR)
          .get()

        const users = usersSnapshot.docs.map((snapshot) => snapshot.data())

        setUserData(
          Object.values(
            _.merge(_.keyBy(users, 'id'), _.keyBy(mentorsData, 'userId'))
          )
        )
        setUsersLoading(false)
      }
      fetchUser()
    }
  }, [mentorsData])

  // [TEMPLATE]
  if (usersLoading) return <Spinner />

  return (
    <Table
      onRow={(record) => ({
        onClick: () =>
          history.push(generatePath(ROUTE_PATHS.USER_SHOW, { id: record.id })),
        onMouseEnter: (e) => {
          e.target.style.cursor = 'pointer'
        }
      })}
      columns={columns}
      dataSource={userData}
      pagination={false}
    />
  )
}

export default MentorSimpleTable
