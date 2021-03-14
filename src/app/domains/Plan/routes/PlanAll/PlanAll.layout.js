import { Content, Sider, Title } from 'antd-styled'

import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { PlanSimpleList } from 'domains/Plan/components/lists'
import { Spinner } from '~/components'
import { useSession } from 'contexts/Session/hooks'
/**
 * @info PlanAll (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanAll - React component.
 *
 * @since 14 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAll = () => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()
  const [plans, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.PLANS).where('id', 'in', session.planIds)
  )

  // [TEMPLATE]
  return (
    <>
      <Content bg="#ffffff" paddingTop={4} paddingX={4}>
        <Title>My plans</Title>
        {loading ? <Spinner /> : <PlanSimpleList data={plans} />}
      </Content>
      <Sider paddingTop={4} paddingX={4}>
        <Title textAlign="center" style={{ color: 'white' }}>
          Todo
        </Title>
      </Sider>
    </>
  )
}

export default PlanAll
