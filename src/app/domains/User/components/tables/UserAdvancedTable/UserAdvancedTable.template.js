import PropTypes from 'prop-types'
import { UserSimpleTable } from '../'
import { Tabs } from 'antd'
const { TabPane } = Tabs
/**
 * @info UserAdvancedTable (05 Mar 2021) // CREATION DATE
 *
 * @comment UserAdvancedTable - React component.
 *
 * @since 07 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const UserAdvancedTable = (props) => {
  // [INTERFACES]
  const { data } = props
  const tabs = [
    {
      tab: 'all',
      viewFor: ''
    },
    {
      tab: 'mentor',
      viewFor: 'mentor'
    },
    {
      tab: 'student',
      viewFor: 'student'
    }
  ]

  // [TEMPLATE]
  return (
    <Tabs defaultActiveKey={tabs[0].tab}>
      {tabs.map((item) => (
        <TabPane tab={item.tab} key={item.tab}>
          <UserSimpleTable viewFor={item.viewFor} data={data} />
        </TabPane>
      ))}
    </Tabs>
  )
}

// [PROPTYPES]
UserAdvancedTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default UserAdvancedTable
