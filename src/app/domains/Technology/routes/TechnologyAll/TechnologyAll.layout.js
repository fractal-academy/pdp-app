import { Typography } from 'antd'
import { TechnologySimpleList } from 'domains/Technology/components/lists'
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
  // [TEMPLATE]
  return (
    <>
      <Title>Technologies</Title>
      <TechnologySimpleList data={MOCK_DATA} />
    </>
  )
}

export default TechnologyAll
