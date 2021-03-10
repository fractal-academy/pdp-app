import { Typography, Button } from 'antd'
import { Box } from 'antd-styled'
import { TechnologySimpleList } from 'domains/Technology/components/lists'
import { useHistory } from 'react-router-dom'
import { ROUTE_PATHS } from 'app/constants'
const { Title } = Typography

/**
 * @info TechnologyAll (05 Mar 2021) // CREATION DATE
 *
 * @comment TechnologyAll - React component.
 *
 * @since 08 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_DATA = [
  { technologyId: 'boGRir9DiSNxCIuBeBNi', skillId: '789' },
  { technologyId: 'D5MeBdtiMGLHB6svJSs9', skillId: '789' },
  { technologyId: 'XgNXGIY5Xo1pKJaUusNr', skillId: '789' },
  { technologyId: 'zi4sSBkfJZs1wlLOOPpJ', skillId: '789' }
]

const TechnologyAll = () => {
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [TEMPLATE]
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Title>Technologies</Title>
        <Button
          type="primary"
          onClick={() => history.push(ROUTE_PATHS.TECHNOLOGY_CREATE)}>
          Add technology
        </Button>
      </Box>
      <TechnologySimpleList data={MOCK_DATA} />
    </>
  )
}

export default TechnologyAll
