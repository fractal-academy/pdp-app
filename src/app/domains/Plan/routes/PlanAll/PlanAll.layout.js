import { Content, Sider, Title } from 'antd-styled'
import firestore from '~/services/Firebase/firestore/index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { PlanSimpleList } from 'domains/Plan/components/lists'
import { Spinner } from '~/components'
import { useSession } from 'contexts/Session/hooks'
import { PageWrapper } from '~/components/HOC'
import { useHistory } from 'react-router-dom'
/**
 * @info PlanAll (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanAll - React component.
 *
 * @since 15 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAll = () => {
  // [ADDITIONAL_HOOKS]
  const session = useSession()
  const [plans, loading] = useCollectionData(
    firestore.collection(COLLECTIONS.PLANS).where('id', 'in', session.planIds)
  )
  const history = useHistory()

  // [TEMPLATE]
  return (
    <>
      <Content bg="#ffffff" paddingTop={4} paddingX={4}>
        <PageWrapper
          title="My plans"
          backBtnLeft
          titleProps={{ textAlign: 'left' }}
          onBack={() => history.goBack()}
          inlineHeader
          fullWidth>
          {loading ? <Spinner /> : <PlanSimpleList data={plans} />}
        </PageWrapper>
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
