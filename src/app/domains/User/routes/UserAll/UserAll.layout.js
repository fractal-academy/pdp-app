import { UserAdvancedTable } from 'domains/User/components/tables'
import { Button, Typography } from 'antd'
const { Title } = Typography

/**
 * @info UserAll (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAll - React component.
 *
 * @since 05 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_DATA = [
  {
    key: '1',
    idUser: 8,
    avatarURL: '',
    firstName: 'Fractal',
    secondName: 'Band2',
    email: 'email@gmail.com',
    role: 'student',
    companyId: '123',
    specialityId: '456'
  },
  {
    key: '2',
    idUser: 8,
    avatarURL:
      'https://firebasestorage.googleapis.com/v0/b/expenses-senseteq.appspot.com/o/photo_2020-11-27_19-32-45.jpg?alt=media&token=75958d4d-46ab-458f-b413-e81696c8c16d',
    firstName: 'Fractal',
    secondName: 'Band2',
    email: 'email@gmail.com',
    role: 'admin',
    companyId: '123',
    specialityId: '456'
  }
]

const UserAll = () => {
  // [TEMPLATE]

  const AddButton = <Button type="primary">Add user</Button>

  return (
    <>
      <Title>Users</Title>
      <UserAdvancedTable
        data={MOCK_DATA}
        tabBarExtraContent={{ right: AddButton }}
      />
    </>
  )
}

// [PROPTYPES]
UserAll.propTypes = {}

export default UserAll
