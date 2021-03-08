import PropTypes from 'prop-types'
import { useReducer } from 'react'
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
 * @since 08 Mar 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const MOCK_SESSION_DATA = { role: ROLES.ADMIN, id: 'qwe' }

const SessionProvider = (props) => {
  // [INTERFACES]
  const { session = MOCK_SESSION_DATA, children, ...rest } = props

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
