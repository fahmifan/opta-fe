import React, { Component } from "react"

import { Link } from "react-router-dom"

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

class Dashboard extends Component {
  render() {
    const { classes } = this.props

    return(
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
      </main>
    );
  }
}

export default withStyles(styles)(Dashboard)