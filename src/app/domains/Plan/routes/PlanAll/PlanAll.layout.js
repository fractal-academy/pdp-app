import { useState } from 'react'
import { List } from 'antd'
import { Content, Sider, Title } from 'antd-styled'
import firestore from '~/services/Firebase/firestore/index'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useCollectionArray } from 'hooks/firebase'
import { COLLECTIONS } from 'app/constants'
import { PlanSimpleList } from 'domains/Plan/components/lists'
import { TodoAdvancedList } from 'domains/Todo/components/lists'
import { Spinner } from '~/components'
import { useSession } from 'contexts/Session/hooks'
import { PageWrapper } from '~/components/HOC'
/**
 * @info PlanAll (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanAll - React component.
 *
 * @since 30 Mar 2021 ( v.0.0.9 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAll = () => {
  // [COMPONENT_STATE_HOOKS]
  const [activePlanId, setActivePlanId] = useState('')

  // [ADDITIONAL_HOOKS]
  const session = useSession()
  const [plans, loading] = useCollectionArray(
    COLLECTIONS.PLANS,
    session?.studentPlanIds
  )
  const [activePlan, loadingActivePlan] = useDocumentData(
    activePlanId && firestore.collection(COLLECTIONS.PLANS).doc(activePlanId)
  )
  // [TEMPLATE]
  if (loading) return <Spinner />
  return (
    <>
      <Content bg="#ffffff" paddingTop={4} paddingX={4}>
        <PageWrapper
          title="My plans"
          titleProps={{ textAlign: 'left' }}
          inlineHeader
          fullWidth>
          {loading ? (
            <Spinner />
          ) : plans?.length ? (
            <PlanSimpleList plans={plans} setActivePlanId={setActivePlanId} />
          ) : (
            <Title level={5}>You don`t have any plans</Title>
          )}
        </PageWrapper>
      </Content>
      <Sider paddingTop={4} paddingX={4} width="25%">
        <Title textAlign="center" style={{ color: 'white' }}>
          Todo
        </Title>
        {loadingActivePlan ? (
          <Spinner />
        ) : activePlan ? (
          <TodoAdvancedList plan={activePlan} activePlanId={activePlanId} />
        ) : (
          <List
            dataSource={plans}
            renderItem={(plan) => <TodoAdvancedList plan={plan} />}
          />
        )}
      </Sider>
    </>
  )
}

export default PlanAll
