import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSessionDispatch, useSession } from 'app/contexts/Session/hooks'
import auth from '~/services/Firebase/auth'
import firestore from '~/services/Firebase/firestore'
import TYPES from '~/app/contexts/Session/types'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import { ROLES } from '~/constants'
import { useForm } from 'antd/lib/form/Form'

const useAuthListener = () => {
  // [ADDITIONAL_HOOKS]
  const [user, userLoading] = useAuthState(auth)
  const history = useHistory()
  const session = useSession()
  const sessionDispatch = useSessionDispatch()

  // [STATE_HOOKS]
  const [loading, setLoading] = useState(true)

  // [USE_EFFECTS]
  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      try {
        const userData = await firestore
          .collection(COLLECTIONS.USERS)
          .doc(user.uid)
          .get()
        console.log(userData)
        sessionDispatch({ type: TYPES.SET_USER, payload: userData.data() })

        //FIXME redirection on manual route change
        history.push('/')
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    if (!user) {
      sessionDispatch({ type: TYPES.SING_OUT })
      !userLoading && history.push(ROUTE_PATHS.SESSION_LOGIN)
      setLoading(userLoading)
    }

    user && !userLoading && fetchUser()
    user && session && setLoading(false)
  }, [user, userLoading])

  return { loading }
}

// const useAuthListener = () => {
//   // [ADDITIONAL_HOOKS]
//   const sessionDispatch = useSessionDispatch()
//   const session = useSession()
//   const history = useHistory()

//   // [STATE_HOOKS]
//   const [loading, setLoading] = useState(true)

//   // [HELPER_FUNCTIONS]
//   const getCurrentUser = () => {
//     try {
//       const currentUser = auth.currentUser
//       if (currentUser) {
//         return currentUser
//       }
//     } catch (error) {
//       console.log(error)
//       return true
//     }
//   }

//   // [LOGIC]

//   if (getCurrentUser()) {
//     history.push(ROUTE_PATHS[session.role])
//   } else {
//     history.push(ROUTE_PATHS.SIGN_IN)
//   }
//   useEffect(() => {
//     const getUser = async (uid) => {
//       const currentUser = await firestore
//         .collection(COLLECTIONS.USERS)
//         .doc(uid)
//         .get()
//       return currentUser.data()
//     }

//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         setLoading(true)
//         let userData = {}

//         if (!!localStorage.getItem('isNewUser')) {
//           const refCollectionUsers = firestore.collection(COLLECTIONS.USERS)
//           const users = await refCollectionUsers.get()
//           const role = !users.docs.length ? ROLES.ADMIN : ROLES.STUDENT
//           userData = { email: user.email, id: user.uid, role }

//           await refCollectionUsers.doc(user.uid).set(userData)

//           localStorage.removeItem('isNewUser')
//         }
//         userData = await getUser(user.uid)
//         console.log(userData)
//         sessionDispatch({ type: TYPES.SET_USER, payload: userData })
//       }
//       console.log(user)
//       setLoading(false)
//     })
//   }, [])
//   console.log(session)
//   return { loading }
// }

export default useAuthListener
