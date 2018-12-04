import React, { Component } from "react"

import { connect } from "react-redux"

import { withRouter, Redirect } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, createStyles } from "@material-ui/core"
import Button from '@material-ui/core/Button'

import { authCheckState } from "../store/auth/action";
import { Theme, btn } from "../utils/colors"

const styles = createStyles({
  root: {
    justify: "center",
    padding: "1rem",
    backgroundColor: Theme.backgroundColor,
    height: "100vh"
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
  
class UserRegister extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    address: "",
    error: null,
  }

  componentDidMount() {
    this.props.authCheckState()
  }

  _inputHandler = (e, key) => {
    this.setState({[key]: e.target.value})
    console.log("key: " + key, "val: " + e.target.value)
  }

  _submitregisterHandler = (e) => {
    const {name, email, password, address} = this.state

    // validate
    if(name === "" && email === "" && password === "") {
      alert("name, email or password cannot be empty"); 
      return;
    }

    const userCreds = {
      "name": name,
      "email": email,
      "password": password,
      "address": address,
    }

    this._doRegist(userCreds)
 
    // this.props.history.push('/login');
  }

  _doRegist(userCreds) {
    console.log(JSON.stringify(userCreds))

    fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCreds)
    })
    .then(res => {
      if(!res.ok) throw new Error(res.statusText)
      return res.json()
    })
    .then(data => {
      this.props.history.push('/login');
    })
    .catch(err => {
      console.log(err)
      this.setState({error: err})
    })
  }

  render() {
    const { classes, isLoading, isAuth } = this.props

    if(!isLoading && isAuth) {
      return <Redirect to="/" />
    }

    return(
      <main className={classes.root}>
        <Typography style={{color: Theme.logo, fontWeight: "bold"}} variant="h4" gutterBottom>
          Register
        </Typography>

        <Grid container 
          spacing={0}
          justify="center"
          direction="column">
          <Grid item xs={12}>
            <form className={classes.container} noValidate autoComplete="on">
              <TextField onChange={(e) => this._inputHandler(e, "name")}
                id="outlined-name"
                label="Name"
                name="name"
                className={classes.textField}
                value={this.state.name}
                margin="normal"
                variant="outlined"
                fullWidth
              />

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

              <TextField onChange={(e) => this._inputHandler(e, "address")}
                id="outlined-address-input"
                label="Alamat"
                className={classes.textField}
                type="text"
                name="alamat"
                autoComplete="address"
                margin="normal"
                variant="outlined"
                fullWidth
                />

              <Button style={btn} 
                onClick={(e) => this._submitregisterHandler(e)}
                variant="contained" color="primary" fullWidth>
                register
              </Button>
            </form>
          </Grid>
        </Grid>

      </main>
    ); 
  }
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

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(UserRegister)))