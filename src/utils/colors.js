import { createMuiTheme } from "@material-ui/core"
export const Theme = {
    backgroundColor: "#f7ecdb",
    logo: "#EB3159",
    textPrimary: "#073642",
    white: "#fff"
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#f7ecdb",
        },
        secondary: {
            main: "#073642",
        },
    }
})
  
export const btn = {
    backgroundColor: Theme.textPrimary,
    color: Theme.logo,
    paddingTop: "1rem",
    paddingBottom: "1rem",
}

export default Theme