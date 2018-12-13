import React from 'react'
import { Route, Redirect  } from 'react-router-dom'
import { connect } from "react-redux"

import { authCheckState } from "../store/auth/action"

const ProtectedRoute = ({ authCheckState,  isAuth, isLoading, ...props }) => 
  !isLoading && isAuth 
  ? <Route {...props}/> 
  : <Redirect to="/login"/>;

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  isLoading: state.isLoading,
  token: state.token,
  userID: state.userID
})

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
