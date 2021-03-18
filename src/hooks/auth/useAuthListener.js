import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import auth from '~/services/Firebase/auth'
import { ROUTE_PATHS } from 'app/constants'
import { useSessionDispatch, useSession } from 'app/contexts/Session/hooks'

const useAuthListener = () => {
  // [STATE_HOOKS]
  const [loading, setLoading] = useState(true)

  // [ADDITIONAL_HOOKS]
  const dispatch = useSessionDispatch()
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

  console.log('reload', auth.currentUser)
  // [LOGIC]
  if (getCurrentUser()) {
    history.push(ROUTE_PATHS[session.role])
  } else {
    history.push(ROUTE_PATHS.SIGN_IN)
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setLoading(false)
      console.log('reload', user)
    })
  }, [])
  return { loading }
}

export default useAuthListener
