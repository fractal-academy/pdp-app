import { useContext } from 'react'
import { sessionContext } from '../context'

const useSession = () => useContext(sessionContext)

export default useSession
