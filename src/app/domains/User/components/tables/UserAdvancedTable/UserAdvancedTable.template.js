import PropTypes from 'prop-types'
import { UserSimpleTable } from '../'
import { ROLES } from '~/constants'
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

const TABS = [
  {
    tab: 'All',
    viewFor: ''
  },
  {
    tab: 'Mentors',
    viewFor: ROLES.MENTOR
  },
  {
    tab: 'Students',
    viewFor: ROLES.STUDENT
  }
]

const UserAdvancedTable = (props) => {
  // [INTERFACES]
  const { data } = props

  // [TEMPLATE]
  return (
    <Tabs defaultActiveKey={TABS[0].tab}>
      {TABS.map((item) => (
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
