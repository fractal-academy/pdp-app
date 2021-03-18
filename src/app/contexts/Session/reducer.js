import TYPES from './types'

const rootReducer = (state, action) => {
  switch (action.type) {
    case TYPES.LOADING:
      return { ...state, loading: action.payload }
    case TYPES.SET_USER:
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
