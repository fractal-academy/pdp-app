import { Tabs } from 'antd'
import { UserSimpleTable } from 'domains/User/components/tables'
import { StudentSimpleTable } from 'domains/Student/components/tables'
import { MentorSimpleTable } from 'app/domains/Mentor/components/tables'
const { TabPane } = Tabs
/**
 * @info UserAdvancedTable (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAdvancedTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.4 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TABS = [
  {
    tab: { title: 'All', Component: <UserSimpleTable /> }
  },
  {
    tab: { title: 'Mentors', Component: <MentorSimpleTable /> }
  },
  {
    tab: { title: 'Students', Component: <StudentSimpleTable /> }
  }
]

const UserAdvancedTable = (props) => {
  // [INTERFACES]
  const { ...rest } = props

  // [TEMPLATE]
  return (
    <Tabs defaultActiveKey={TABS[0].tab.title} size="large" {...rest}>
      {TABS.map((item) => (
        <TabPane tab={item.tab.title} key={item.tab.title}>
          {item.tab.Component}
        </TabPane>
      ))}
    </Tabs>
  )
}

export default UserAdvancedTable
