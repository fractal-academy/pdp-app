import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { message } from 'antd'
import { useSessionDispatch } from 'app/contexts/Session/hooks'
import TYPES from '~/app/contexts/Session/types'
import firestore, {
  getCollectionData,
  setDocument,
  getDocumentData,
  getDocumentRef
} from '~/services/Firebase/firestore'
import auth from '~/services/Firebase/auth'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import { ROLES } from '~/constants'

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
          const users = await getCollectionData(COLLECTIONS.USERS)
          const studentId = getDocumentRef(COLLECTIONS.STUDENTS).id

          const role = users.length ? ROLES.STUDENT : ROLES.ADMIN

          await setDocument(COLLECTIONS.USERS, user.uid, {
            email: user.email,
            id: user.uid,
            role,
            studentId
          })

          await setDocument(COLLECTIONS.STUDENTS, studentId, {
            id: studentId,
            userId: user.uid
          })

          localStorage.removeItem('isNewUser')
        }
        const userData = await getDocumentData(COLLECTIONS.USERS, user.uid)

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
