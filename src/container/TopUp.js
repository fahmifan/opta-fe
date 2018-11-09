import React, { Component } from "react"

import { withRouter } from "react-router-dom"

import { connect } from "react-redux"

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
    error: null,
    isSuccess: false,
  }

  _inputHandler = (e, key) => {
    const value = parseInt(e.target.value, 10)

    this.setState({[key]: value})
    console.log("key: " + key, "val: " + value)
  }

  _submitTopUpHandler = () => {
    const { nominal } = this.state
    const { token, userID } = this.props

    console.log("nominal", nominal)
    if(!Number.isInteger(nominal)) {
      alert("Nominal is not valid!")
      return
    }

    if(nominal < 10000) {
      alert("Nominal is too small, minimum is Rp10.000,-")
      return
    }

    const payload = {
      "nominal": nominal,
      "user_id": userID,
    }

    fetch("/api/user/topup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if(!res.ok) {
        this.setState({error: res.error, isSuccess: false})
        throw new Error(res.error)
      }

      this.setState({error: null, isSuccess: true})
      return res.json()
    })
    .then(res => {
      this._topupSuccess()
    })
    .catch(error => {
      console.log("error", error)
      this.setState({error: error, isSuccess: false,
      })
    })
  }

  _topupSuccess = () => {
    alert("Top Up Success")

    // susspend this
    this.props.history.push("/dashboard")
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

              <Button onClick={() => this._submitTopUpHandler()}
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

const mapStateToProps = state => ({
  token: state.token,
  userID: state.userID
})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(TopUp)))