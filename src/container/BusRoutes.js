import React, { Component } from "react"

import { withStyles } from '@material-ui/core/styles';
import { Typography, createStyles } from "@material-ui/core"

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

class BusRoutes extends Component {
  state = {
    isLoad: false,
    routes: [],
  }

  componentDidMount() {
    this._getBusRoutes()
  }

  _getBusRoutes = () => {
    // start loading
    this.setState({isLoad: true})

    fetch("/api/routes", {
      method: "GET",
    })
    .then(req => req.json())
    .then(res => {
      this.setState({routes: [...res]})
    
      this.setState({isLoad: false})
    })
    .catch(err => {
      console.log("err", err)

      this.setState({isLoad: false})
    })
  } 


  render() {
    const { classes } = this.props
    const { isLoad, routes } = this.state

    let busRoutes = "Loading..."

    if(routes.length > 0) {
      busRoutes = routes.map(route => (
        <li key={route.bus_id}>{route.start_loc} -- {route.end_loc}</li>
      ))
    }

    return(
      <main className={classes.root}>
        <Typography variant="h4">Rute Bus</Typography>
        <br/> <br/>

        {busRoutes}

      </main>
    );
  }
}

export default withStyles(styles)(BusRoutes)