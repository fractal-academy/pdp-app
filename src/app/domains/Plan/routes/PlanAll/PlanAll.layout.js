import { Content, Sider, Title } from 'antd-styled'
import { List } from 'antd'
import firestore from '~/services/Firebase/firestore/index'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { COLLECTIONS } from 'app/constants'
import { PlanSimpleList } from 'domains/Plan/components/lists'
import { TodoAdvancedList } from 'domains/Todo/components/lists'
import { Spinner } from '~/components'
import { useSession } from 'contexts/Session/hooks'
import { PageWrapper } from '~/components/HOC'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
/**
 * @info PlanAll (05 Mar 2021) // CREATION DATE
 *
 * @comment PlanAll - React component.
 *
 * @since 18 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const PlanAll = () => {
  // [COMPONENT_STATE_HOOKS]
  const [activePlanId, setActivePlanId] = useState('')

  // [ADDITIONAL_HOOKS]
  const session = useSession()
  const [plans, loading] = useCollectionData(
    session?.planIds &&
      firestore.collection(COLLECTIONS.PLANS).where('id', 'in', session.planIds)
  )
  const [activePlan, loadingActivePlan] = useDocumentData(
    activePlanId && firestore.collection(COLLECTIONS.PLANS).doc(activePlanId)
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
          {loading ? (
            <Spinner />
          ) : (
            <PlanSimpleList plans={plans} setActivePlanId={setActivePlanId} />
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
        ) : plans ? (
          <List
            dataSource={plans}
            renderItem={(plan) => <TodoAdvancedList plan={plan} />}
          />
        ) : (
          <Title>You don`t have any plans</Title>
        )}
      </Sider>
    </>
  )
}

export default PlanAll
