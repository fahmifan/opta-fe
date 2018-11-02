import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import { MenuAppBar } from "./components"

import {
  Home, 
  Login, 
  Dashboard, 
  QrScan, 
  Register,
  TopUp,
  BusRoutes,
} from "./container" 

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <CssBaseline />
          <MenuAppBar appName="OPTA" /> <br />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/scan" component={QrScan} />
          <Route path="/topup" component={TopUp} />
          <Route path="/bus_routes" component={BusRoutes} />
          <Route path="/" exact={true} component={Home} />
        </React.Fragment>
      </Router>
    )
  }
}

export default App
