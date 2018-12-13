import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

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

const priceFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 2
})

export const PaymentInfo = ({classes, price, handlePay}) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="h5" component="h2">
        Bayar: { priceFormatter.format(price|| 0) }
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={handlePay} size="small"> Bayar </Button>
    </CardActions>
  </Card>
)

export const BalanceNotEnough = ({classes, price}) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="h5" component="h2">
        Saldo tidak cukup untuk melakukan transaksi <br />
        <br />
        Silahkan melakukan top up saldo terlebih dahulu <br />
        <br />
        <small>Bayar: { priceFormatter.format(price) }</small>
      </Typography>
    </CardContent>
    <CardActions>
      <Link to="/topup"><Button size="small"> Top Up </Button></Link>
      <Link to="/dashboard"><Button size="small"> Kembali </Button></Link>
    </CardActions>
  </Card>
)

export const PaymentSuccess = ({classes}) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="h5" component="h2">
        Pembayaran berhasil
      </Typography>
    </CardContent>
    <CardActions>
      <Link to="/dashboard"><Button size="small"> Kembali </Button></Link>
    </CardActions>
  </Card>
)

class QrScan extends Component {
  state = {
      delay: 200,
      result: null,
      doPay: false,
      paySuccess: false,
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

    // request payment if scan is success
    if(data && data !== null) {
      this.setState({data: data})
      this._getBusPrice(data)
    }
  }

  _getBusPrice(bus_id) {
    fetch(`/api/bus/${bus_id}/price`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": this.props.token,
      }
    })
      .then(req => req.json())
      .then(res => {
        console.log(res);
        this.setState({price: res, doPay: true})
      })
      .catch(error => console.log("Error", error))
  }
  
  _handleError = (err) => {
    console.error(err)
  }
  
  _pay = () => {
    this.setState({isFetching: true})
    const { data } = this.state
    const { userID, token } = this.props

    fetch(`/api/user/pay`, {
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
      .then(req => {
        console.log("req", req)
        if(!req.ok || req.error) throw new Error(req.error)

        return req.json()
      })
      .then(res => {
        console.log("price", res.price)

        this.setState({
          price: res.price,
          doPay: false, 
          error: res.error && null, 
          isFetching: false,
          paySuccess: true,
        })  
      })
      .catch(error => {
        // show error message to user
        alert(error)

        this.props.history.push("/")
      })
  }

  render(){
    const { price, error, doPay, paySuccess } = this.state
    const { classes } = this.props

    // show pay modals
    if(doPay) {
      return (
        <PaymentInfo classes={classes} price={price} handlePay={this._pay} />
      )
    }
    
    // show balance not enough
    if(!price && price !== 0 && error !== null) {
      return <BalanceNotEnough classes={classes} price={price} />
    }
    
    if(paySuccess) {
      return <PaymentSuccess classes={classes} />
    }
    
    return(
      <>
        {<QrReader
          delay={this.state.delay}
          onError={(err) => this._handleError(err)}
          onScan={(data) => this._handleScan(data)}
          style={{ width: '100%' }}
          />}
        <p>{this.state.result}</p>
      </>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  userID: state.userID
})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(QrScan)))