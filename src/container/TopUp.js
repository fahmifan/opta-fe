import React, { Component } from "react"

import { withRouter } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, createStyles } from "@material-ui/core"
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
  
class TopUp extends Component {
  state = {
    nominal: 0,
  }

  _inputHandler = (e, key) => {
    const value = parseInt(e.target.value, 10)

    this.setState({[key]: value})
    console.log("key: " + key, "val: " + value)
  }

  _submitTopUpHandler = (e) => {
    const {nominal} = this.state

    console.log("nominal", nominal)
    if(!Number.isInteger(nominal)) {
      alert("Nominal is not valid!")
      return
    }

    if(nominal < 10000) {
      alert("Nominal is too small, minimum is Rp10.000,-")
      return
    }

    alert("TopUp Successfull");
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
              <TextField onChange={(e) => this._inputHandler(e, "nominal")}
                id="outlined-number"
                label="Nominal"
                className={classes.textField}
                type="number"
                name="nominal"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                placeholder="999"
                fullWidth>
              Rp
              </TextField>

              <Button onClick={(e) => this._submitTopUpHandler(e)}
                variant="contained" color="primary" fullWidth>
                TopUp!
              </Button>
            </form>
          </Grid>
        </Grid>
      </main>
    ); 
  }
}

export default withRouter(withStyles(styles)(TopUp));