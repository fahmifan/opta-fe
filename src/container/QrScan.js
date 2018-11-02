import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
class QrScan extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      result: null,
      price: 0,
    }
    this.handleScan = this.handleScan.bind(this)
  }

  /**
   * handleScan invokes when app is scanning
   * & it updates `state.result` using the resulted data. 
   * @param {string} data 
   */
  handleScan(data){
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
  
  handleError(err){
    console.error(err)
  }
  
  _pay = (busCode) => {
    fetch(`/api/pay`, {
      method: "POST",
      body: {
        "user_id": 1,
        "bus_id": busCode,
      }
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
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default QrScan;