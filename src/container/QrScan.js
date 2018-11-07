import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { Typography } from "@material-ui/core"

import { authCheckState } from "../store/auth/action";

class QrScan extends Component {
  state = {
      delay: 300,
      result: null,
      doPay: true,
      price: 0,
      error: null,
    }

  componentDidUpdate() {
    if(this.state.doPay) {
      this.setState({doPay: false})
      this._pay(this.state.data)
    }
  }

  /**
   * handleScan invokes when app is scanning
   * & it updates `state.result` using the resulted data. 
   * @param {string} data 
   */
  _handleScan = (data) => {
    console.log("data", data)

    if(data && data !== null) {
      this.setState({doPay: true, data: data})
    }
  }
  
  _handleError = (err) => {
    console.error(err)
  }
  
  _pay = (busCode) => {
    fetch(`/api/user/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": this.props.token,
      },
      body: JSON.stringify({
        "user_id": 1,
        "bus_id": Number.parseInt(busCode, 10),
      })
    })
    .then(req => {
      if(!req.ok) {
        this.setState({error: req.error, doPay: false}) 
        throw new Error(req.error)
      }

      return req.json()
    })
    .then(res => {
      console.log("res", res)
      // check again
      if(res.status_code !== 200) {
        this.setState({error: res.error, doPay: false})
        return
      }

      this.setState({price: res.price, doPay: true})
    })
    .catch(error => {
      this.setState({error: error, doPay: false})
      console.log("error", error)
    })

    console.log("busCode", busCode)
  }

  render(){
    const {price, error} = this.state
    const {isAuth, isLoading} = this.props

    if(!isLoading && !isAuth) {
      return <Redirect to="/login" />
    }

    if(error) {
      return (
        <main style={{margin: "auto"}}>
          {alert(error)}

          return <Redirect to="/dashboard" />
        </main>
      ) 
    }

    if(price !== 0) {
      return (
        <div>
          <h1>price: {price}</h1>
        </div>
      )
    }

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          onError={(err) => this._handleError(err)}
          onScan={(data) => this._handleScan(data)}
          style={{ width: '100%' }}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  isLoading: state.isLoading,
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState)
})

export default connect(mapStateToProps, mapDispatchToProps)(QrScan)