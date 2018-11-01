import React, { Component } from "react"

import { Link } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button'

const scanLink = props => <Link to="/scan" {...props} />

class Dashboard extends Component {
  render() {
    return(
      <React.Fragment>
        <Typography variant="h4">Dashboard</Typography>
        <Button component={scanLink} variant="contained" color="primary" fullWidth={true}>
          Scan!
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles()(Dashboard)