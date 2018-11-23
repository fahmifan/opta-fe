import React, { Component } from "react"

import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"

import { authCheckState } from "../store/auth/action"

import { withStyles } from '@material-ui/core/styles';
import { Typography, createStyles } from "@material-ui/core"
import Button from '@material-ui/core/Button'

const styles = createStyles({
  root: {
    justify: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
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

const scanLink = props => <Link to="/scan" {...props} />
const topupLink = props => <Link to="/topup" {...props} />
const busRouteLink = props => <Link to="bus_routes" {...props} />
const userBalanceLink = props => <Link to="/balance" {...props} />

const Dashboard = ({classes, authCheckState, isAuth, isLoading}) => {
  authCheckState()
  
  if(!isLoading && !isAuth) {
    return <Redirect to="/" />
  }

  return (
    <main className={classes.root}>
      <Typography variant="h4">Dashboard</Typography>

      <br/> <br/>
      <Button component={scanLink} variant="contained" color="primary" fullWidth={true}>
        Scan!
      </Button> 
      
      <br/> <br/>
      <Button component={topupLink} variant="contained" color="primary" fullWidth={true}>
        Top Up!
      </Button>

      <br/> <br/>
      <Button component={busRouteLink} variant="contained" color="primary" fullWidth={true}>
        Rute Bus
      </Button>

      <br/> <br/>
      <Button component={userBalanceLink} variant="contained" color="primary" fullWidth={true}>
        Balance
      </Button>

    </main>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth,
    isLoading: state.isLoading,
  }
}

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))