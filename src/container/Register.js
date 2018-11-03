import React, { Component } from "react"

import { connect } from "react-redux"

import { withRouter } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, createStyles } from "@material-ui/core"
import Button from '@material-ui/core/Button'

import { authCheckState } from "../auth/action";

const styles = createStyles({
  root: {
    justify: "center"
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
  
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  }

  componentDidMount() {
    this.props.authCheckState()
  }

  _inputHandler = (e, key) => {
    this.setState({[key]: e.target.value})
    console.log("key: " + key, "val: " + e.target.value)
  }

  _submitregisterHandler = (e) => {
    const {name, email, password} = this.state
    
    if(name === "" && email === "" && password === "") {
      alert("name, email or password cannot be empty"); 
      return;
    }

    alert("register Successfull"); 
    this.props.history.push('/login');
  }

  render() {
    const { classes } = this.props
    return(
      <main className={classes.root}>
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

              <Button onClick={(e) => this._submitregisterHandler(e)}
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

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState())
})

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(Register)))