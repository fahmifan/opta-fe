import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux"
import CssBaseline from '@material-ui/core/CssBaseline';

import { authCheckState } from "./store/auth/action";
import { 
  MenuAppBar, 
  ProtectedRoute, 
  UnprotectedRoute 
} from "./components"

import {
  Home, 
  UserLogin, 
  Dashboard, 
  QrScan, 
  UserRegister,
  TopUp,
  BusRoutes,
  UserBalance,
} from "./container" 

class App extends Component {
  componentDidMount() {
    this.props.authCheckState()
  }

  render() {
    return (
      <>
      <CssBaseline />
      <MenuAppBar appName="OPTA" />
      
      <Router>
        <Switch>
          <UnprotectedRoute path="/login" exact component={UserLogin} />
          <UnprotectedRoute path="/register" exact component={UserRegister} />
          
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/scan" component={QrScan} />
          <ProtectedRoute path="/topup" component={TopUp} />
          <ProtectedRoute path="/bus_routes" component={BusRoutes} />
          <ProtectedRoute path="/login" exact component={UserLogin} />
          <ProtectedRoute path="/register" exatc component={UserRegister} />
          <ProtectedRoute path="/balance" exact component={UserBalance} />
          <UnprotectedRoute path="/home" exact component={Home} />

          <UnprotectedRoute path="/" component={Home} />
        </Switch>
      </Router>
      </>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  isLoading: state.isLoading
})

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
