import React, { Component } from "react"

import { Link, withRouter } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, createStyles } from "@material-ui/core"
import Button from '@material-ui/core/Button'
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

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
  
class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  _inputEmailHandler = e => {
    this.setState({email: e.target.value})
  }

  _inputPasswordHandler = e => {
    this.setState({password: e.target.value})
  }

  _submitLoginHandler = (e) => {
    const {email, password} = this.state
    
    if(email === "" && password === "") {
      alert("email or password cannot be empty"); 
      return;
    }

    if(email !== "opta@email.com" && password !== "opta") {
      alert("Login Failed"); 
      return;
    }
  
    alert("Login Successfull"); 
    this.props.history.push('/dashboard');
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
            <form className={classes.container} noValidate autoComplete="off">
              <TextField onChange={(e) => this._inputEmailHandler(e)}
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

              <TextField onChange={(e) => this._inputPasswordHandler(e)}
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

              <Button onClick={(e) => this._submitLoginHandler(e)}
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

export default withRouter(withStyles(styles)(Login));