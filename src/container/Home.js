import React from "react"

import { Link, Redirect } from "react-router-dom"

import { connect } from "react-redux"

import { authCheckState } from "../store/auth/action"

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    verticalAlign: "middle",
  }
})

const loginLink = props => <Link to="/login" {...props} />
const registerLink = props => <Link to="/register" {...props} />

// class Home extends Component {
const Home =({classes, isAuth, isLoading, authCheckState}) => {
  authCheckState()
  
  if(!isLoading && isAuth) {
    return <Redirect to="/dashboard" />
  }

  return(
    <main className={classes.root}>
      <Typography variant="h4" gutterBottom>
        OPTA
      </Typography>

      <Grid container 
        spacing={16}>
        
        <Grid item xs={6}>
          <Button component={loginLink} variant="contained" color="primary" fullWidth={true}>
            Login
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button component={registerLink} variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Grid>

      </Grid>
    </main>
  )

}

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  isLoading: state.isLoading,
})

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))