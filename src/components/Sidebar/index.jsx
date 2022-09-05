import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import { Grid, Button, Typography } from "@material-ui/core"
import { NavLink } from "react-router-dom"
import { colors } from "../../colors"
import { getAuth } from "firebase/auth"
const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))
function Sidebar() {
  const auth = getAuth()
  const classes = useStyles()
  const routes = [
    { route: "Overview", icon: <i class="fa-solid fa-house"></i> },
    { route: "Stats", icon: <i class="fa-solid fa-chart-simple"></i> },
    { route: "Projects", icon: <i class="fa-solid fa-folder-open"></i> },
    { route: "Chat", icon: <i class="fa-solid fa-comment-dots"></i> },
    { route: "Calendar", icon: <i class="fa-solid fa-calendar-days"></i> },
  ]
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        {routes.map((ele, index) => (
          <NavLink
            to={`./${ele.route}`}
            style={({ isActive }) => {
              return {
                fontSize: "16px",
                textDecoration: "none",
                fontFamily: "Poppins",
                margin: "1rem",
                fontWeight: isActive ? "600" : "400",
                color: isActive ? colors.primary : "darkgray",
                borderRight: isActive ? "5px solid " + colors.primary : "none",
                borderRadiusRight: "8px",
              }
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>{ele.icon}</span>
            {ele.route}
          </NavLink>
        ))}
        <Grid item xs={12}>
          <Typography
            // variant="outlined"
            fullWidth
            style={{
              fontSize: "16px",
              textDecoration: "none",
              fontFamily: "Poppins",
              margin: "1rem",
              fontWeight: "400",
              color: "darkgray",
              cursor: "pointer",
            }}
            onClick={() => {
              auth.signOut()
            }}
          >
            <i
              class="fa-solid fa-right-from-bracket"
              style={{ marginRight: "0.5rem" }}
            ></i>
            Logout
          </Typography>
        </Grid>
      </Drawer>
    </div>
  )
}

export default Sidebar
