import React from 'react'
import { Route, Redirect  } from 'react-router-dom'
import { connect } from "react-redux"

import { authCheckState } from "../store/auth/action"

const UnprotectedRoute = ({ authCheckState,  isAuth, isLoading, ...props }) => {
  authCheckState()

  return !isAuth
  ? <Route {...props}/> 
  : <Redirect to="/dashboard"/>;
}

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  isLoading: state.isLoading,
  token: state.token,
  userID: state.userID
})

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState)
})

export default connect(mapStateToProps, mapDispatchToProps)(UnprotectedRoute)
