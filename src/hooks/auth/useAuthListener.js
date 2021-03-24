import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { message } from 'antd'
import { useSessionDispatch } from 'app/contexts/Session/hooks'
import TYPES from '~/app/contexts/Session/types'
import firestore, {
  getCollectionData,
  setDocument,
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
    let unsubscribeUsers
    const fetchUser = async () => {
      try {
        if (!!localStorage.getItem('isNewUser')) {
          const users = await getCollectionData(COLLECTIONS.USERS)
          const studentId = getDocumentRef(COLLECTIONS.STUDENTS).id

          const userData = {
            email: user.email,
            id: user.uid,
            role: users.length ? ROLES.STUDENT : ROLES.ADMIN,
            studentId
          }

          if (userData.role === ROLES.ADMIN) {
            const mentorId = getDocumentRef(COLLECTIONS.MENTORS).id
            userData.mentorId = mentorId
            await setDocument(COLLECTIONS.MENTORS, mentorId, {
              id: mentorId,
              userId: user.uid,
              isAdmin: true
            })
          }

          await setDocument(COLLECTIONS.USERS, user.uid, userData)

          localStorage.removeItem('isNewUser')
        }
        unsubscribeUsers = firestore
          .collection(COLLECTIONS.USERS)
          .doc(user.uid)
          .onSnapshot((doc) => {
            sessionDispatch({
              type: TYPES.SET_USER,
              payload: doc.data()
            })
            setLoading(false)
          })

        if (!!localStorage.getItem('signIn')) {
          history.push('/')
          localStorage.removeItem('signIn')
        }
      } catch (error) {
        message.error(error.message)
        setLoading(false)
      }
    }

    if (!user) {
      !userLoading && history.push(ROUTE_PATHS.SESSION_LOGIN)
      setLoading(userLoading)
    }
    user && !userLoading && fetchUser()

    return () => unsubscribeUsers?.()
  }, [user, userLoading])

  return { loading }
}

export default useAuthListener
