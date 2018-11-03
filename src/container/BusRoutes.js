import React, { Component } from "react"

import { connect } from "react-redux"

import { Redirect } from "react-router-dom"

import { authCheckState } from "../auth/action"

import { withStyles } from '@material-ui/core/styles';
import { 
  Typography,
  List,
  CircularProgress,
  Divider,
  createStyles 
} from "@material-ui/core"

import {BusCollapse} from "../components"

const styles = createStyles({
  root: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  progress: {
    marginTop: "2rem",
    margin: "auto",
    display: "block",  
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
    this.props.authCheckState()
    this.props.token && this._getBusRoutes(this.props.token)
  }

  _getBusRoutes = (token) => {
    // start loading
    this.setState({isLoad: true})

    fetch("/api/routes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      }
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
    const { classes, isAuth, isLoading } = this.props
    const { isLoad, routes } = this.state

    if(!isLoading && !isAuth) {
      return <Redirect to="/login" />
    }

    return(
      <main className={classes.root}>
        <Typography variant="h5">Rute Bus</Typography>
      
        {isLoad && <CircularProgress className={classes.progress} />}

        <List component="nav">
          { 
            routes.length > 0 && routes.map(route => (
              <React.Fragment key={route.id}>
                <BusCollapse 
                  id={route.id}
                  start_loc={route.start_loc}
                  end_loc={route.end_loc}
                  detail={route.detail}
                />
                <Divider />  
              </React.Fragment>
            )) 
          }
        </List>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  isAuth: state.isAuth,
  userID: state.userID,
  isLoading: state.isLoading
})

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusRoutes))