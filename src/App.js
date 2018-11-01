import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {Home, Login, Dashboard, QrScan} from "./container" 

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/scan" component={QrScan} />
          <Route path="/" exact={true} component={Home} />
        </React.Fragment>
      </Router>
    )
  }
}

export default App
