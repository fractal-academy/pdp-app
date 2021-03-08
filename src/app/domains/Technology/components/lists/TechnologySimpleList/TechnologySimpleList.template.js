import PropTypes from 'prop-types'
import { List, Card } from 'antd'
import { TechnologyAdvancedView } from '../../views'
import { Box, Edit, Remove } from 'antd-styled'
/**
 * @info TechnologySimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologySimpleList - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const TechnologySimpleList = (props) => {
  // [INTERFACES]
  const { data } = props

  // [TEMPLATE]
  return (
    <List
      grid={{ gutter: 10, column: 3 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card>
            <TechnologyAdvancedView {...item} />
            <Box display="flex" justifyContent="flex-end">
              <Box mr={2}>
                <Edit text="edit" mr={2} />
              </Box>
              <Box>
                <Remove text="remove" />
              </Box>
            </Box>
          </Card>
        </List.Item>
      )}
    />
  )
}

// [PROPTYPES]
TechnologySimpleList.propTypes = {
  data: PropTypes.array.isRequired
}

export default TechnologySimpleList
