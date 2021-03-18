import TYPES from './types'

const rootReducer = (state, action) => {
  switch (action.type) {
    case TYPES.LOADING:
      return { ...state, loading: action.payload }
    case TYPES.SIGN_UP:
      return {
        ...state,
        ...action.payload
      }
    case TYPES.LOG_IN:
      return {
        ...state,
        ...action.payload
      }
    case TYPES.SIGN_OUT:
      return {}
    default: {
      return state
    }
  }
}

export default rootReducer
