import { Typography } from 'antd'
import { StudentSimpleTable } from 'domains/Student/components/tables'
const { Title } = Typography

/**
 * @info StudentAll (08 Mar 2021) // CREATION DATE
 *
 * @comment StudentAll - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_DATA = [
  {
    key: '1',
    id: 'fesf',
    avatarURL: '',
    firstName: 'Fractal',
    secondName: 'Band2',
    email: 'email@gmail.com',
    role: 'student',
    companyId: '123'
  },
  {
    key: '2',
    id: 'asdf',
    avatarURL:
      'https://firebasestorage.googleapis.com/v0/b/expenses-senseteq.appspot.com/o/photo_2020-11-27_19-32-45.jpg?alt=media&token=75958d4d-46ab-458f-b413-e81696c8c16d',
    firstName: 'Fractal',
    secondName: 'Band2',
    email: 'email@gmail.com',
    role: 'admin',
    companyId: '123'
  }
]

const StudentAll = () => {
  // [TEMPLATE]
  return (
    <>
      <Title>Students</Title>
      <StudentSimpleTable data={MOCK_DATA} />
    </>
  )
}

// [PROPTYPES]
StudentAll.propTypes = {}

export default StudentAll
