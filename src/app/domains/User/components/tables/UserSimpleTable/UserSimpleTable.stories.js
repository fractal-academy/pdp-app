import React from 'react'
import UserSimpleTable from './UserSimpleTable.template'
import { UserSimpleView } from 'domains/User/components/views'
import { CompanySimpleView } from 'domains/Company/components/views'
import { RoleSimpleView } from 'domains/Role/components/views'
import { SpecialitySimpleView } from 'domains/Speciality/components/views'
import { Typography } from 'antd'
const { Text } = Typography

const metadata = {
  title: 'app/domains/User/components/tables/UserSimpleTable',
  component: UserSimpleTable
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
    role: 'admin',
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

const columns = [
  {
    title: 'User',
    key: 'user',
    render: (text, data) => (
      <UserSimpleView
        avatarURL={data.avatarURL}
        firstName={data.firstName}
        secondName={data.secondName}
        email={data.email}
      />
    )
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email) => <Text type="secondary">{email}</Text>
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role) => <RoleSimpleView role={role} />
  },
  {
    title: 'Company',
    key: 'company',
    dataIndex: 'companyId',
    render: (companyId) => <CompanySimpleView companyId={companyId} />
  },
  {
    title: 'Speciality',
    key: 'speciality',
    dataIndex: 'specialityId',
    render: (specialityId) => (
      <SpecialitySimpleView specialityId={specialityId} />
    )
  }
]
export const UserSimpleTableStory = (args) => (
  <UserSimpleTable data={data} columns={columns} {...args} />
)

UserSimpleTableStory.args = {}
