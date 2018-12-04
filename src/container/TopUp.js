import React, { Component } from "react"

import { withRouter } from "react-router-dom"

import { connect } from "react-redux"

import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, createStyles } from "@material-ui/core"
import Button from '@material-ui/core/Button'

import MaskedInput from "react-text-mask"
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { btn, Theme } from "../utils/colors"

const numberMask = createNumberMask({
  prefix: 'Rp',
  suffix: '',
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ',',
  allowDecimal: true,
  decimalLimit: 2,
})

const TextMasked = (props) => {
  const {inputRef, ...other} = props  
  return <MaskedInput
    {...other}
    ref={inputRef}
    mask={numberMask}
    showMask
  />
}

const styles = createStyles({
  root: {
    justify: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "1rem",
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
    placeholder: "Rp 999"
  }

  _inputHandler = key => event => {
    this.setState({[key]: event.target.value})
  }

  _submitTopUpHandler = () => {
    const nominal = parseInt(this.state.nominal.match(/\d/g).join(""), 10)
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
        <Typography style={{color: Theme.logo}} variant="h4">Top Up</Typography>

        <Grid container 
          spacing={0}
          justify="center"
          direction="column">
          <Grid item xs={12}>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField 
                id="outlined-number"
                label="Nominal"
                className={classes.textField}
                type="text"
                name="nominal"
                margin="normal"
                InputProps={{
                  inputComponent: TextMasked,
                  value: this.state.nominal,
                  onChange: this._inputHandler("nominal"),
                }}
                variant="outlined"
                fullWidth>
              </TextField>

              <Button style={btn} 
                onClick={() => this._submitTopUpHandler()}
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