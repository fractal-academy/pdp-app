import { useEffect, useState } from 'react'
import { useHistory, generatePath } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { message } from 'antd'
import { useSessionDispatch, useSession } from 'app/contexts/Session/hooks'
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
  const session = useSession()

  // [STATE_HOOKS]
  const [loading, setLoading] = useState(true)

  // [USE_EFFECTS]
  useEffect(() => {
    setLoading(true)
    let unsubscribeUser, unsubscribeStudent, unsubscribeMentor

    const getMentorData = (mentorId) =>
      getCollectionRef(COLLECTIONS.MENTORS)
        .doc(mentorId)
        .onSnapshot((studentData) =>
          sessionDispatch({ type: TYPES.SET_USER, payload: studentData.data() })
        )

    const getStudentData = (studentId) =>
      getCollectionRef(COLLECTIONS.STUDENTS)
        .doc(studentId)
        .onSnapshot((studentData) => {
          sessionDispatch({ type: TYPES.SET_USER, payload: studentData.data() })
          setLoading(false)
        })

    const getUserData = () =>
      getCollectionRef(COLLECTIONS.USERS)
        .doc(user.uid)
        .onSnapshot((userSnapshot) => {
          const userData = userSnapshot.data()
          if (!userData) {
            sessionDispatch({ type: TYPES.SIGN_OUT })
            setLoading(false)
          } else {
            if (userData?.mentorId) {
              unsubscribeMentor = getMentorData(userData.mentorId)
            }

            unsubscribeStudent = getStudentData(userData.studentId)

            sessionDispatch({ type: TYPES.SET_USER, payload: userData })
          }
        })

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
        }

        unsubscribeUser = getUserData()

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
      sessionDispatch({ type: TYPES.SIGN_OUT })
      !userLoading && history.push(ROUTE_PATHS.SESSION_LOGIN)
      setLoading(userLoading)
    }
    user && !userLoading && fetchUser()

    return () =>
      unsubscribeUser?.() && unsubscribeStudent?.() && unsubscribeMentor?.()
  }, [user, userLoading])

  useEffect(() => {
    if (user && session && localStorage.getItem('isNewUser')) {
      history.push(generatePath(ROUTE_PATHS.USER_SHOW, { id: session.id }))
      localStorage.removeItem('isNewUser')
      localStorage.setItem('editProfile', true)
    }
    !session && history.push(ROUTE_PATHS.SESSION_LOGIN)
  }, [session])
  return { loading }
}

export default useAuthListener
