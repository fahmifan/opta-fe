import React, { Component } from "react"

import { withRouter, Route } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import { 
  Typography,
  List,
  ListItem, 
  ListItemText,
  Collapse,
  Divider,
  createStyles 
} from "@material-ui/core"

import NavigateNext from "@material-ui/icons/NavigateNext"
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {BusCollapse} from "../components"

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
    open: false,
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

  _listItemHandler = (busId) => {
    this.setState({open: !this.state.open})
    const currentURL = this.props.match.url
    this.props.history.push(`${currentURL}/${busId}`);
  }

  render() {
    const { classes, match } = this.props
    const { isLoad, routes, open } = this.state

    return(
      <main className={classes.root}>
        <Typography variant="h5">Rute Bus</Typography>
        <br/>
        
        {isLoad && "Loading..."}

        <List component="nav">
          { 
            routes.length > 0 && 
            routes.map(route => {
              return (
                <React.Fragment>
                  <BusCollapse 
                    id={route.id}
                    start_loc={route.start_loc}
                    end_loc={route.end_loc}
                  />
                  <Divider />  
                </React.Fragment>
              )
            }) 
          }
        </List>
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(BusRoutes))