import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSessionDispatch } from 'app/contexts/Session/hooks'
import auth from '~/services/Firebase/auth'
import {
  getCollectionData,
  setDocument,
  getDocumentData
} from '~/services/Firebase/firestore'
import TYPES from '~/app/contexts/Session/types'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import { ROLES } from '~/constants'
import { message } from 'antd'

const useAuthListener = () => {
  // [ADDITIONAL_HOOKS]
  const [user, userLoading] = useAuthState(auth)
  const history = useHistory()
  const sessionDispatch = useSessionDispatch()

  // [STATE_HOOKS]
  const [loading, setLoading] = useState(true)

  // [USE_EFFECTS]
  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      try {
        if (!!localStorage.getItem('isNewUser')) {
          const users = await getCollectionData(`${COLLECTIONS.USERS}`)

          const role = !users.length ? ROLES.ADMIN : ROLES.STUDENT
          await setDocument(`${COLLECTIONS.USERS}`, user.uid, {
            email: user.email,
            id: user.uid,
            role
          })
          localStorage.removeItem('isNewUser')
        }
        const userData = await getDocumentData(`${COLLECTIONS.USERS}`, user.uid)

        sessionDispatch({ type: TYPES.SET_USER, payload: userData })

        if (!!localStorage.getItem('signIn')) {
          history.push('/')
          localStorage.removeItem('signIn')
        }
      } catch (error) {
        message.error(error.message)
        setLoading(false)
      }
      setLoading(false)
    }

    if (!user) {
      sessionDispatch({ type: TYPES.SING_OUT })
      !userLoading && history.push(ROUTE_PATHS.SESSION_LOGIN)
      setLoading(userLoading)
    }
    user && !userLoading && fetchUser()
  }, [user, userLoading])

  return { loading }
}

export default useAuthListener
