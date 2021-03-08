import { types } from './constants'

const rootReducer = (state, action) => {
  switch (action.type) {
    case types.CHANGE_ROLE: {
      return { ...state, role: action.payload }
    }
    default: {
      return state
    }
  }
}

export default rootReducer
