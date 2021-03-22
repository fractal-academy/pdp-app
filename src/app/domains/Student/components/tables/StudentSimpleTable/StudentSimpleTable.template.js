import { Table, Typography } from 'antd'
import { useHistory, generatePath } from 'react-router-dom'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import firestore from '~/services/Firebase/firestore'
import { Spinner } from '~/components'
const { Text } = Typography

/**
 * @info StudentSimpleTable (08 Mar 2021) // CREATION DATE
 *
 * @comment StudentSimpleTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
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
    dataIndex: 'company',
    key: 'company',
    render: (text, data) =>
      data.companyId ? (
        <CompanySimpleView companyId={data.companyId} />
      ) : (
        <Text type="secondary">None</Text>
      )
  }
]

const StudentSimpleTable = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [ADDITIONAL_HOOKS]
  const [studentsData, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.STUDENTS)
  )

  // [TEMPLATE]
  if (loading) return <Spinner />

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
      dataSource={studentsData}
      pagination={false}
    />
  )
}

export default StudentSimpleTable
