import React from "react"
import { Grid, Typography, Divider } from "@material-ui/core"
import authHeroImg from "./../../assets/img/auth/AuthHeroImg.png"
import Login from "../../components/Auth/Login/index"
import SignUp from "../../components/Auth/SignUp/index.jsx"
import { useState } from "react"
function Auth() {
  const [activeStep, setActiveStep] = useState(0)
  return (
    <Grid container style={{ height: "90vh" }} alignItems="center">
      <Grid item xs={7} style={{ textAlign: "center" }}>
        <img
          src={authHeroImg}
          alt="altHero"
          style={{ width: "350px", objectFit: "contain" }}
        />
      </Grid>
      <Grid
        item
        xs={5}
        container
        style={{
          background: "#FFFFFF",
          border: "2px solid rgba(26, 59, 88, 0.24)",
          borderRadius: "65px",
          padding: "2rem",
          height: "500px",
        }}
      >
        <Grid
          item
          xs={12}
          container
          spacing={2}
          style={{ marginBottom: "2rem" }}
        >
          <Typography
            variant="h4"
            onClick={() => setActiveStep(0)}
            style={{ marginLeft: "1rem", cursor: "pointer" }}
            color={activeStep === 0 ? "primary" : "secondary"}
          >
            Login
          </Typography>
          <Typography
            onClick={() => setActiveStep(1)}
            variant="h4"
            style={{ marginLeft: "1rem", cursor: "pointer" }}
            color={activeStep === 1 ? "primary" : "secondary"}
          >
            Signup
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ padding: "0 6rem" }}>
          <Divider />
        </Grid>
        <Grid item xs={12} container style={{ padding: "1rem" }}>
          {activeStep === 0 ? <Login /> : <SignUp />}{" "}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Auth
