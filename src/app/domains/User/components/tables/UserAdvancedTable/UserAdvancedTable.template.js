import { useState } from 'react'
import { UserSimpleTable } from 'domains/User/components/tables'
import { ROLES } from '~/constants'
import { Tabs } from 'antd'
const { TabPane } = Tabs
/**
 * @info UserAdvancedTable (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAdvancedTable - React component.
 *
 * @since 22 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TABS = [
  {
    tab: { title: 'All', viewFor: '' }
  },
  {
    tab: { title: 'Mentors', viewFor: ROLES.MENTOR }
  },
  {
    tab: { title: 'Students', viewFor: ROLES.STUDENT }
  }
]

const UserAdvancedTable = (props) => {
  // [INTERFACES]
  const { ...rest } = props

  // [COMPONENT_STATE_HOOKS]
  const [viewFor, setViewFor] = useState()

  // [TEMPLATE]
  return (
    <Tabs
      defaultActiveKey={TABS[0].tab.title}
      size="large"
      onChange={(tab) => setViewFor(tab)}
      {...rest}>
      {TABS.map((item) => (
        <TabPane tab={item.tab.title} key={item.tab.viewFor}>
          <UserSimpleTable viewFor={viewFor} />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default UserAdvancedTable
