import PropTypes from 'prop-types'
import { useReducer } from 'react'
import rootReducer from 'contexts/Session/reducer'
import {
  sessionDispatchContext,
  sessionContext
} from 'contexts/Session/context'

/**
 * @info SessionProvider (07 Mar 2021) // CREATION DATE
 *
 * @comment SessionProvider - React context component.
 *
 * @since 29 Mar 2021 ( v.0.0.5 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const SessionProvider = (props) => {
  // [INTERFACES]
  const { session = null, children, ...rest } = props

  // [COMPONENT_STATE_HOOKS]
  const [state, dispatch] = useReducer(rootReducer, session)

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
