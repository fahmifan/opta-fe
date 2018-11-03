import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class QrScan extends Component {
  state = {
      delay: 300,
      result: null,
      price: 0,
    }

  /**
   * handleScan invokes when app is scanning
   * & it updates `state.result` using the resulted data. 
   * @param {string} data 
   */
  _handleScan = (data) => {
    console.log("data", data)

    if(data !== null) {
      this._pay(data)
    }

    if(data){
      this.setState({
        result: data,
      })
    }
  }
  
  _handleError = (err) => {
    console.error(err)
  }
  
  _pay = (busCode) => {
    fetch(`/api/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": this.props.token,
      },
      body: JSON.stringify({
        "user_id": 1,
        "bus_id": busCode,
      })
    })
      .then(req => req.json())
      .then(res => {
        console.log("res", res)
        this.setState({price: res.price})
      })
      .catch(err => {
        console.log("err", err)
      })

    console.log("busCode", busCode)
  }

  render(){
    const {price} = this.state
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

export default connect(mapStateToProps)(QrScan)