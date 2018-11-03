import React, { Component } from "react"

import { Route, withRouter } from "react-router-dom"

import { 
  List,
  ListItem, 
  ListItemText,
  Collapse,
  ListItemIcon,
  Typography
} from "@material-ui/core"

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

class BussCollapse extends Component {
  state = {
    open: false
  }

  _listItemHandler = (busId) => {
    this.setState({open: !this.state.open})
    const currentURL = this.props.match.url
    this.props.history.push(`${currentURL}/${busId}`);
  }

  render() {
    const {id, start_loc, end_loc, match} = this.props 
    const {open} = this.state

    return (
      <React.Fragment>

        <ListItem onClick={() => this._listItemHandler(id)} button>
          <ListItemText primary={`${start_loc} - ${end_loc}`} />
          {!open ? <ExpandMore /> : <ExpandLess />}
        </ListItem>
  
        <Route path={`${match.url}/${id}`}
          render={props => (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <BusRoutesDetail id={id} 
                    start_loc={start_loc} 
                    end_loc={end_loc} />
                </ListItem>
              </List>
            </Collapse>
          )}
        />
      </React.Fragment>
    )
  }
}

const BusRoutesDetail = ({id, start_loc, end_loc}) => (
  <div>
    <table>
      <tbody>
        <tr>
          <td><Typography>No</Typography></td>
          <td><Typography>{id}</Typography></td>
        </tr>
        <tr>
          <td><Typography>Awal</Typography></td>
          <td><Typography>{start_loc}</Typography></td>
        </tr>
        <tr>
          <td><Typography>Akhir</Typography></td>
          <td><Typography>{end_loc}</Typography></td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default withRouter(BussCollapse)