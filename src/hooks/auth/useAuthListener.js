import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import auth from '~/services/Firebase/auth'
import { ROUTE_PATHS, COLLECTIONS } from 'app/constants'
import { useSessionDispatch, useSession } from 'app/contexts/Session/hooks'
import firestore from '~/services/Firebase/firestore'
import TYPES from '~/app/contexts/Session/types'
import { ROLES } from '~/constants'

const useAuthListener = () => {
  // [STATE_HOOKS]
  const [loading, setLoading] = useState(true)

  // [ADDITIONAL_HOOKS]
  const sessionDispatch = useSessionDispatch()
  const session = useSession()
  const history = useHistory()

  // [HELPER_FUNCTIONS]
  const getCurrentUser = () => {
    try {
      const currentUser = auth.currentUser
      if (currentUser) {
        return currentUser
      }
    } catch (error) {
      console.log(error)
      return true
    }
  }

  // [LOGIC]

  if (getCurrentUser()) {
    history.push(ROUTE_PATHS[session.role])
  } else {
    history.push(ROUTE_PATHS.SIGN_IN)
  }
  useEffect(() => {
    const getUser = async (uid) => {
      const currentUser = await firestore
        .collection(COLLECTIONS.USERS)
        .doc(uid)
        .get()
      return currentUser.data()
    }

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let userData = {}

        if (!!localStorage.getItem('isNewUser')) {
          const refCollectionUsers = firestore.collection(COLLECTIONS.USERS)
          const users = await refCollectionUsers.get()
          const role = users ? ROLES.ADMIN : ROLES.STUDENT
          userData = { email: user.email, id: user.uid, role }

          await refCollectionUsers.doc(user.uid).set(userData)

          localStorage.removeItem('isNewUser')
        }
        userData = await getUser(user.uid)

        history.push(
          ROUTE_PATHS.START_PAGE_MAP[ROLES[userData.role.toUpperCase()]]
        )

        console.log(userData)
        sessionDispatch({ type: TYPES.SET_USER, payload: userData })
        setLoading(false)
      }
      console.log(user)
    })
  }, [])
  console.log(session)
  return { loading }
}

export default useAuthListener
