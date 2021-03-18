import PropTypes from 'prop-types'
import { useReducer, useEffect } from 'react'
import rootReducer from 'contexts/Session/reducer'
import {
  sessionDispatchContext,
  sessionContext
} from 'contexts/Session/context'
import { ROLES } from '~/constants'

/**
 * @info SessionProvider (07 Mar 2021) // CREATION DATE
 *
 * @comment SessionProvider - React context component.
 *
 * @since 18 Mar 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SessionProvider = (props) => {
  // [INTERFACES]
  const { session, children, ...rest } = props

  // [COMPONENT_STATE_HOOKS]
  const [state, dispatch] = useReducer(rootReducer, {
    ...session,
    loading: false
  })

  useEffect(() => {
    console.log(state)
  }, [state])
  // [TEMPLATES]
  return (
    <sessionDispatchContext.Provider value={dispatch}>
      <sessionContext.Provider value={state} {...rest}>
        {children}
      </sessionContext.Provider>
    </sessionDispatchContext.Provider>
  )
}

// [PROPTYPES]
SessionProvider.propTypes = {
  children: PropTypes.element,
  session: PropTypes.object
}

export default SessionProvider
