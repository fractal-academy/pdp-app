import { useEffect, useState } from 'react'
import { Space, Table } from 'antd'
import { useHistory, generatePath } from 'react-router-dom'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Spinner } from '~/components'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { CompetenceSimpleView } from 'domains/Competence/components/views'
import firestore from '~/services/Firebase/firestore'
import { mergeUserData } from '~/utils'
import { ROLES } from '~/constants'
import { COLLECTIONS, ROUTE_PATHS } from 'app/constants'
import { useSession } from 'contexts/Session/hooks'

/**
 * @info MentorSimpleTable (22 Mar 2021) // CREATION DATE
 *
 * @comment MentorSimpleTable - React component.
 *
 * @since 31 Mar 2021 ( v.0.0.6 ) // LAST-EDIT DATE
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
  // {
  //   title: 'Company',
  //   dataIndex: 'company',
  //   key: 'company',
  //   render: (text, data) => (
  //     <Space>
  //       {data?.companyIds?.map((companyId) => (
  //         <CompanySimpleView companyId={companyId} />
  //       ))}
  //     </Space>
  //   )
  // },
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
  const session = useSession()

  const [mentorsData] = useCollectionData(
    firestore
      .collection(COLLECTIONS.MENTORS)
      .where('userId', '!=', session.userId)
  )

  // [COMPONENT_STATE_HOOKS]
  const [userData, setUserData] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)

  // [USE_EFFECTS]
  useEffect(() => {
    if (mentorsData) {
      const fetchUser = async () => {
        setUsersLoading(true)
        const mergeData = await mergeUserData(ROLES.MENTOR, mentorsData)
        setUserData(mergeData)
        setUsersLoading(false)
      }
      fetchUser()
    }
  }, [mentorsData])

  // [TEMPLATE]
  if (usersLoading) return <Spinner />

  console.log(userData)

  return (
    <Table
      onRow={(record) => ({
        onClick: () =>
          history.push(
            generatePath(ROUTE_PATHS.USER_SHOW, { id: record.userId })
          ),
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
