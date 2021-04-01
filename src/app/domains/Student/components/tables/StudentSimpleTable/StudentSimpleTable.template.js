import { useEffect, useState } from 'react'
import { Button, Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { Spinner } from '~/components'
import { useSession } from 'contexts/Session/hooks'
import { getCollectionRef } from '~/services/Firebase/firestore'
import { mergeUserData } from '~/utils'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import { ROLES } from '~/constants'

/**
 * @info StudentSimpleTable (08 Mar 2021) // CREATION DATE
 *
 * @comment StudentSimpleTable - React component.
 *
 * @since 01 Apr 2021 ( v.0.1.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

let columns = [
  {
    title: 'Student',
    key: 'student',
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
    dataIndex: 'companyId',
    key: 'company',
    render: (text, data) => (
      <Space>
        {data.companyIds.map((companyId) => (
          <CompanySimpleView companyId={companyId} />
        ))}
      </Space>
    )
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: '',
    render: (text, data) => <CreatePlanButton studentId={data.id} />
  }
]

const CreatePlanButton = (props) => {
  const { studentId } = props
  const history = useHistory()
  return (
    <Button
      type="primary"
      onClick={() =>
        history.push(ROUTE_PATHS.PLAN_CREATE, { student: { id: studentId } })
      }>
      Create plan
    </Button>
  )
}

const StudentSimpleTable = (props) => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()
  const [studentsData] = useCollectionData(
    getCollectionRef(COLLECTIONS.STUDENTS).where('userId', '!=', session.userId)
  )

  // [COMPONENT_STATE_HOOKS]
  const [userData, setUserData] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)

  // [USE_EFFECTS]
  useEffect(() => {
    if (studentsData) {
      const fetchUser = async () => {
        setUsersLoading(true)
        const mergeData = await mergeUserData(ROLES.STUDENT, studentsData)
        setUserData(mergeData)
        setUsersLoading(false)
      }
      fetchUser()
    }
  }, [studentsData])

  // [TEMPLATE]
  if (usersLoading) return <Spinner />

  return (
    <Table
      columns={columns}
      dataSource={userData}
      pagination={false}
      {...props}
    />
  )
}

export default StudentSimpleTable
