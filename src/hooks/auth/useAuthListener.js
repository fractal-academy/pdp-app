import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { message } from 'antd'
import { useSessionDispatch } from 'app/contexts/Session/hooks'
import TYPES from '~/app/contexts/Session/types'
import {
  getCollectionData,
  setDocument,
  getDocumentRef,
  getCollectionRef
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
    let unsubscribeUser, unsubscribeStudent, unsubscribeMentor
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
          await setDocument(COLLECTIONS.STUDENTS, studentId, {
            id: studentId,
            userId: user.uid
          })

          await setDocument(COLLECTIONS.USERS, user.uid, userData)

          localStorage.removeItem('isNewUser')
        }

        unsubscribeUser = getCollectionRef(COLLECTIONS.USERS)
          .doc(user.uid)
          .onSnapshot((userData) => {
            const fullUserData = userData.data()
            unsubscribeStudent = getCollectionRef(COLLECTIONS.STUDENTS)
              .doc(fullUserData.studentId)
              .onSnapshot((studentData) => {
                unsubscribeMentor =
                  fullUserData?.mentorId &&
                  getCollectionRef(COLLECTIONS.MENTORS)
                    .doc(fullUserData.mentorId)
                    .onSnapshot((mentorData) => {
                      sessionDispatch({
                        type: TYPES.SET_MENTOR,
                        payload: mentorData.data()
                      })
                    })

                sessionDispatch({
                  type: TYPES.SET_USER,
                  payload: { ...studentData.data(), ...fullUserData }
                })
                setLoading(false)
              })
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

    return () =>
      unsubscribeUser?.() && unsubscribeStudent?.() && unsubscribeMentor?.()
  }, [user, userLoading])

  return { loading }
}

export default useAuthListener
