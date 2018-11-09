import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router-dom"

import { authCheckState } from "../store/auth/action";

class QrScan extends Component {
  state = {
      delay: 200,
      result: null,
      doPay: false,
      price: 0,
      error: null,
      isFetching: false,
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
      this._pay()
    }
  }
  
  _handleError = (err) => {
    console.error(err)
  }
  
  _pay = () => {
    this.setState({isFetching: true})

    fetch(`/api/user/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": this.props.token,
      },
      body: JSON.stringify({
        "user_id": 1,
        "bus_id": Number.parseInt(this.state.data, 10),
      })
    })
    .then(req => {
      if(!req.ok) {
        this.setState({error: req.error, doPay: false}) 
        throw new Error(req.error)
      }
      this.setState({error: null, doPay: false})
      return req.json()
    })
    .then(data => {
      // check if the payment is success
      if(!data.status) {
        this.setState({price: data.price, doPay: false, error: data.error, isFetching: false})
        alert(data.error)

        this.props.history.push("/")

        return
      }

      // after paid don't request again
      this.setState({price: data.price, doPay: false, error: null, isFetching: false})        
    })
    .catch(error => {
      this.setState({error: error, doPay: false, isFetching: false})
      console.log("error", error)
    })
  }

  render(){
    const {price, error, doPay} = this.state
    const {isAuth, isLoading} = this.props

    if(!isLoading && !isAuth) {
      return <Redirect to="/login" />
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
        {<QrReader
          delay={this.state.delay}
          onError={(err) => this._handleError(err)}
          onScan={(data) => this._handleScan(data)}
          style={{ width: '100%' }}
          />}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QrScan))