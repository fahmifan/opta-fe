import React, { Component } from "react"

import { Link } from "react-router-dom"

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

class Home extends Component {
  render() {
    const {classes} = this.props
  
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
}

export default withStyles(styles)(Home);