import React, { Component } from "react"

import { withRouter } from "react-router-dom"

import { connect } from "react-redux"
import actions from "../auth/action"

import { withStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  TextField, 
  Typography, 
  createStyles, 
  CircularProgress, 
} from "@material-ui/core"

import Button from '@material-ui/core/Button'

const styles = createStyles({
  root: {
    justify: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  progress: {
    marginTop: "2rem",
    margin: "auto",
    display: "block",  
  },
});
  
class Login extends Component {
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

    if(email !== "opta@email.com" && password !== "opta") {
      alert("Login Failed"); 
      return;
    }
  
    reqLogin(email, password)

    console.log("error", error)

    history.push('/dashboard');
  }

  render() {
    const { classes, isLoading } = this.props

    if(isLoading) {
      return <CircularProgress className={classes.progress} />
    }

    return(
      <main className={classes.root}>
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

              <Button onClick={() => this._login()}
                variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </Grid>
        </Grid>

        <Typography>email: opta@email.com; password: opta</Typography>
      </main>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    userID: state.userID,
    error: state.error,
    isLoading: state.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reqLogin: (email, password) => {
      dispatch(actions.reqLogin(email, password))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Login)));