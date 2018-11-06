import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import { connect } from "react-redux"

import { authCheckState } from "./auth/action";

import CssBaseline from '@material-ui/core/CssBaseline';

import { MenuAppBar } from "./components"

import {
  Home, 
  UserLogin, 
  Dashboard, 
  QrScan, 
  UserRegister,
  TopUp,
  BusRoutes,
} from "./container" 

class App extends Component {
  componentDidMount() {
    this.props.authCheckState()
  }

  render() {
    const {isAuth, isLoading} = this.props
    
    let routes = (
      <>
      <CssBaseline />
      <MenuAppBar appName="OPTA" /> <br />
      <Route path="/login" exact component={UserLogin} />
      <Route path="/register" exatc component={UserRegister} />
      <Route path="/home" exact component={Home} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
      </>
    )

    if(!isLoading && isAuth) {
      routes =  (
        <>
        <CssBaseline />
        <MenuAppBar appName="OPTA" /> <br />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/scan" component={QrScan} />
          <Route path="/topup" component={TopUp} />
          <Route path="/bus_routes" component={BusRoutes} />
          <Route path="/login" exact component={UserLogin} />
          <Route path="/register" exatc component={UserRegister} />
          <Route path="/home" exact component={Home} />
          <Route path="/" exact component={Home} />
        </Switch>
        </>
      )
    }

    return (
      <Router>
        {routes}
      </Router>
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
