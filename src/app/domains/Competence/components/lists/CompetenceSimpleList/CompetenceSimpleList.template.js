import PropTypes from 'prop-types'
import { List, Card, Typography } from 'antd'
import { Box } from 'antd-styled'
import { CompetenceSimpleView } from 'domains/Competence/components/views'
import { TechnologySimpleView } from 'domains/Technology/components/views'
import { LevelSingleSelect } from 'domains/Level/components/selects'
import { EditOutlined } from '@ant-design/icons'
const { Text } = Typography
/**
 * @info CompetenceSimpleList (05 Mar 2021) // CREATION DATE
 *
 * @comment CompetenceSimpleList - React component.
 *
 * @since 12 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const CompetenceSimpleList = (props) => {
  // [INTERFACES]
  const { data } = props

  // [HELPER_FUNCTIONS]
  const onEdit = (competenceId) => {}

  // [TEMPLATE]

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={data}
      renderItem={(competence) => (
        <List.Item key={competence.id}>
          <Card
            title={
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box display="inline-block">
                  <CompetenceSimpleView competenceId={competence.id} />
                </Box>

                <EditOutlined onClick={() => onEdit(competence.id)} />
              </Box>
            }>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Box>
                {competence.technologyIds ? (
                  competence.technologyIds.map((technology) => (
                    <TechnologySimpleView
                      tag
                      technologyId={technology}
                      key={technology}
                    />
                  ))
                ) : (
                  <Text>There are not technologies...</Text>
                )}
              </Box>
              {competence.levelIds && (
                <LevelSingleSelect competenceId={competence.id} />
              )}
            </Box>
          </Card>
        </List.Item>
      )}
    />
  )
}

// [PROPTYPES]
CompetenceSimpleList.propTypes = {
  data: PropTypes.array.isRequired
}

export default CompetenceSimpleList
