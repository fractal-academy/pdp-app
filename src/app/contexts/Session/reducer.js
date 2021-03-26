import TYPES from './types'

const rootReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return {
        ...state,
        ...action.payload
      }
    case TYPES.SET_MENTOR:
      return {
        ...state,
        ...action.payload
      }
    case TYPES.SIGN_OUT:
      return null
    default: {
      return state
    }
  }
}

export default rootReducer
