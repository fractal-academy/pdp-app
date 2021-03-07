import { useContext } from 'react'
import { sessionDispatchContext } from '../context'

const useSessionDispatch = () => useContext(sessionDispatchContext)

export default useSessionDispatch
