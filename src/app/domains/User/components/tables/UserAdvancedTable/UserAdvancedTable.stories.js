import React from 'react'
import UserAdvancedTable from './UserAdvancedTable.template'

const metadata = {
  title: 'app/domains/User/components/tables/UserAdvancedTable',
  component: UserAdvancedTable
}
export default metadata
const data = [
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

export const UserAdvancedTableStory = (args) => (
  <UserAdvancedTable data={data} {...args} />
)

UserAdvancedTableStory.args = {}
