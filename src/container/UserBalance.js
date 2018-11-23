import React, { Component } from "react"

import { withRouter, Link } from "react-router-dom"

import { connect } from "react-redux"

import { withStyles } from '@material-ui/core/styles';
import {  
  Card,
  Typography, 
  CardActions,
  CardContent,
  Button,
  createStyles 
} from "@material-ui/core"

const styles = createStyles({
  root: {
    justify: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  card: {
    minWidth: 275,
    margin: 8
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
  
class UserBlance extends Component {
  state = {
    balance: 0,
    error: null,
    isSuccess: false,
  }

  componentDidMount() {
    this._getBalance()
  }

  _getBalance = async () => {
    try {
      const req = await fetch("/api/user/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": this.props.token
        },
        body: JSON.stringify({
          "user_id": parseInt(this.props.userID, 10)
        })      
      })

      const res = await req.json()
      this.setState({balance: res})          

    } catch(error) {
      console.log("error", error)
    }
  }

  render() {
    const { classes } = this.props
    
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    })

    return(<>
      <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Bayar: { formatter.format(this.state.balance|| 7500) }
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/topup"><Button size="small"> TopUp </Button></Link>
          </CardActions>
        </Card>
    </>)
  }
}

const mapStateToProps = state => ({
  token: state.token,
  userID: state.userID
})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(UserBlance)))