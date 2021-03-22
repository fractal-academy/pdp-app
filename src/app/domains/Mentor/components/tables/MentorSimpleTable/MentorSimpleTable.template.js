import { Table, Typography } from 'antd'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { CompetenceSimpleView } from 'domains/Competence/components/views'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firestore from '~/services/Firebase/firestore'
import { Spinner } from '~/components'
import { COLLECTIONS } from 'app/constants'
const { Text } = Typography
/**
 * @info MentorSimpleTable (22 Mar 2021) // CREATION DATE
 *
 * @comment MentorSimpleTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
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
    render: (text, data) =>
      data.companyId ? (
        <CompanySimpleView companyId={data.companyId} />
      ) : (
        <Text type="secondary">None</Text>
      )
  },
  {
    title: 'Competence',
    dataIndex: 'competence',
    key: 'competence',
    render: (text, data) =>
      data?.competenceIds?.length ? (
        <CompetenceSimpleView competenceId={data.competenceIds[0]} />
      ) : (
        <Text type="secondary">None</Text>
      )
  }
]

const MentorSimpleTable = () => {
  // [ADDITIONAL_HOOKS]
  const [mentorsData, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.MENTORS)
  )

  // [TEMPLATE]
  if (loading) return <Spinner />

  return <Table columns={columns} dataSource={mentorsData} pagination={false} />
}

export default MentorSimpleTable
