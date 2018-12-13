import React, { Component } from "react"

import { withRouter, Redirect, Link } from "react-router-dom"

import { connect } from "react-redux"
import actions, { authCheckState } from "../store/auth/action"

import { withStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  TextField, 
  Typography, 
  createStyles, 
  CircularProgress, 
  Snackbar,
} from "@material-ui/core"

import Button from '@material-ui/core/Button'

import { Theme, btn } from "../utils/colors"

const styles = createStyles({
  root: {
    flexGrow: 1,
    textAlign: "center",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    verticalAlign: "middle",
    backgroundColor: Theme.backgroundColor,
    color: Theme.textPrimary,
    height: "100vh",
    paddingTop: "2rem"
  },
  progress: {
    marginTop: "2rem",
    margin: "auto",
    display: "block",  
  },
});
  
class UserLogin extends Component {
  state = {
    email: "",
    password: "",
  }

  _inputHandler = (e, type) => {
    this.setState({[type]: e.target.value})
  }

  _login = () => {
    const {email, password} = this.state
    const {history, reqLogin, error} = this.props
    
    if(email === "" && password === "") {
      alert("email or password cannot be empty"); 
      return;
    }
  
    reqLogin(email, password)

    console.log("error", error)

    history.push('/');
  }

  render() {
    const { classes, isLoading, isAuth } = this.props

    if(isLoading) {
      return <CircularProgress className={classes.progress} />
    }

    return(
      <main className={classes.root}>
        <Typography style={{color: Theme.logo, fontWeight: "bold"}} variant="h4" gutterBottom>
          OPTA
        </Typography>

        <Grid container spacing={0} justify="center" direction="column">
          <Grid item xs={12}>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField onChange={(e) => this._inputHandler(e, "email")}
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                fullWidth
                />

              <TextField onChange={(e) => this._inputHandler(e, "password")}
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                name="password"
                autoComplete="password"
                margin="normal"
                variant="outlined"
                fullWidth
                />

              <Button style={btn} onClick={() => this._login()}
                variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
  
        <Grid container spacing={0}>
          <Grid xs={12}>
            <Typography>belum punya akun? <Link to="/register" style={{color: Theme.logo}}>klik di sini</Link> </Typography>
          </Grid>
        </Grid>
  
        <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={true}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Login first</span>}
        />
      </main>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    isLoading: state.isLoading,
    isAuth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reqLogin: (email, password) => {
      dispatch(actions.reqLogin(email, password))
    },
    authCheckState: () => dispatch(authCheckState()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(UserLogin)));