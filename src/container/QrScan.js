import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
import { connect } from "react-redux"
import { Redirect, withRouter, Link } from "react-router-dom"

import { authCheckState } from "../store/auth/action"

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 275,
    margin: 8
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

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
        .then(this._getBalance())
    }
  }
  
  _getBalance = () => {
    
  }

  _handleError = (err) => {
    console.error(err)
  }
  
  _pay = async () => {
    this.setState({isFetching: true})
    const { data } = this.state
    const { userID, token } = this.props

    try {
      const req = await fetch(`/api/user/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify({
          "user_id": userID,
          "bus_id": Number.parseInt(data, 10),
        })
      })

      const res = await req.json()
      
      console.log("payment status", res.status)
      
      !res.status
      // set error
      ? this.setState({
          price: res.price, 
          doPay: false, 
          error: res.error, 
          isFetching: false
        })
      // don't request again
      : this.setState({
          price: res.price,
          doPay: false, 
          error: null, 
          isFetching: false
        }) 
    } catch(error) {
      // show error message to user
      alert(error)
      this.props.history.push("/")
    }
  }

  render(){
    const { price, error } = this.state
    const { isAuth, isLoading, classes } = this.props

    // check auth
    if(!isLoading && !isAuth) {
      return <Redirect to="/login" />
    }

    // show price
    if(price !== 0 && error == null) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
  
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Bayar: { formatter.format(price|| 7500) }
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/dashboard"><Button size="small"> Back </Button></Link>
          </CardActions>
        </Card>
      )
    }
    else if(price !== null && price !== undefined && price !== 0 && error !== null) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
  
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Saldo tidak cukup untuk melakukan transaksi <br />
              <br />
              Silahkan melakukan top up saldo terlebih dahulu <br />
              <br />
              <small>Bayar: { formatter.format(price) }</small>
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/topup"><Button size="small"> Top Up </Button></Link>
            <Link to="/dashboard"><Button size="small"> Kembali </Button></Link>
          </CardActions>
        </Card>
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
  token: state.token,
  userID: state.userID
})

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(QrScan)))