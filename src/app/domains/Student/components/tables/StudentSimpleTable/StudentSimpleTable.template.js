import { useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import { useHistory, generatePath } from 'react-router-dom'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import firestore from '~/services/Firebase/firestore'
import { Spinner } from '~/components'
import { ROLES } from '~/constants'
import _ from 'lodash'

/**
 * @info StudentSimpleTable (08 Mar 2021) // CREATION DATE
 *
 * @comment StudentSimpleTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.7) // LAST-EDIT DATE
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
    render: (text, data) => <CompanySimpleView companyId={data?.companyId} />
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

const StudentSimpleTable = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const [studentsData] = useCollectionData(
    firestore.collection(COLLECTIONS.STUDENTS)
  )

  // [COMPONENT_STATE_HOOKS]
  const [userData, setUserData] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)

  // [USE_EFFECTS]
  useEffect(() => {
    if (studentsData) {
      const fetchUser = async () => {
        setUsersLoading(true)
        const usersSnapshot = await firestore
          .collection(COLLECTIONS.USERS)
          .where('role', '==', ROLES.STUDENT)
          .get()

        const users = usersSnapshot.docs.map((snapshot) => snapshot.data())

        setUserData(
          Object.values(
            _.merge(_.keyBy(users, 'id'), _.keyBy(studentsData, 'userId'))
          )
        )
        setUsersLoading(false)
      }
      fetchUser()
    }
  }, [studentsData])

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

export default StudentSimpleTable
