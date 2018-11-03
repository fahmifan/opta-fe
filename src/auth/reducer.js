import { actionType } from "./action"

const initState = {
  isAuth: false,
  token: null,
  userID: null,
  isLoading: false,
  error: null,
}

export default function reducer(state = initState, action) {
  switch(action.type) {
    case actionType.REQ_LOGIN_START :
      return {
        ...state,
        isAuth: false,
        token: null,
        userID: null,
        isLoading: true,
        error: null,
      }

    case actionType.REQ_LOGIN_FAILED: 
      const {error} = action.payload
      return {
        ...state,
        isAuth: false,
        token: null,
        userID: null,
        isLoading: false,
        error: error,
      }

    case actionType.REQ_LOGIN_SUCCESS:
      const {token, userID} = action.payload
      return {
        ...state,
        isAuth: true,
        token: token,
        userID: userID,
        isLoading: false,
        error: null,
      }

    default: return state
  }
}