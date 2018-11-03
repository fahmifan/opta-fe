const REQ_LOGIN = "REQ_LOGIN"
const REQ_LOGIN_START = "REQ_LOGIN_START"
const REQ_LOGIN_SUCCESS = "RER_LOGIN_SUCCESS"
const REQ_LOGIN_FAILED = "REQ_LOGIN_FAILED"
const REQ_LOGOUT = "REQ_LOGOUT"

const TOKEN = "token"
const EXPIRATION_DATE = "expirationDate"
const USER_ID = "userID"

export const actionType = {
  REQ_LOGIN,
  REQ_LOGIN_START,
  REQ_LOGIN_SUCCESS,
  REQ_LOGIN_FAILED,
  REQ_LOGOUT,
}

const reqLoginStart = () => ({
  type: REQ_LOGIN_START,
})

const reqLoginSuccess = ({token, user_id}) => ({
  type: REQ_LOGIN_SUCCESS,
  payload: {
    token: token,
    userID: user_id,
  }
})

const reqLoginFailed = (error) => ({
  type: REQ_LOGIN_FAILED,
  payload: {
    error: error,
  }
})


const reqLogin = (email, password) =>  {
  return dispatch => {
    dispatch(reqLoginStart())
  
    console.log("email, password", email, password)
  
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => {
      if(!res.ok) throw new Error(res.statusText)
      return res.json()
    })
    .then(data => {
      const expirationDate = new Date(new Date().getTime() + 30 * 1000);

      localStorage.setItem(TOKEN, data.token)
      localStorage.setItem(USER_ID, data.user_id)
      localStorage.setItem(EXPIRATION_DATE, expirationDate)
      
      dispatch(reqLoginSuccess(data))
    })
    .catch(error => {
      console.log(error)
      dispatch(reqLoginFailed(error))
    })
  }
}

export const logout = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(EXPIRATION_DATE);
  localStorage.removeItem(USER_ID);
  return {
    type: REQ_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem(TOKEN);

    if(!token) {
      dispatch(logout());
      return
    }

    const expirationDate = new Date(localStorage.getItem(EXPIRATION_DATE));
    const currDate = new Date();
    
    if(expirationDate <= currDate) {
      dispatch(logout());
      return
    } 

    const userID = localStorage.getItem(USER_ID);

    console.log("token, userID", token, userID)
    
    dispatch(reqLoginSuccess({token, userID}));
    const timeOut = (expirationDate.getTime() - new Date().getTime()) / 1000;
    dispatch(checkAuthTimeout(timeOut));
  }
}

export default {
  reqLogin,
}