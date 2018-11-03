const REQ_LOGIN = "REQ_LOGIN"
const REQ_LOGIN_START = "REQ_LOGIN_START"
const REQ_LOGIN_SUCCESS = "RER_LOGIN_SUCCESS"
const REQ_LOGIN_FAILED = "REQ_LOGIN_FAILED"

export const actionType = {
  REQ_LOGIN,
  REQ_LOGIN_START,
  REQ_LOGIN_SUCCESS,
  REQ_LOGIN_FAILED,
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
      dispatch(reqLoginSuccess(data))
    })
    .catch(error => {
      console.log(error)
      dispatch(reqLoginFailed(error))
    })
  }
}

export default {
  reqLogin,
}