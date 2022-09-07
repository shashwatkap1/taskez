import React from "react"
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import { useState } from "react"
import { validateEmail } from "../../../helper"
import { toast } from "react-toastify"
import { Grid, TextField, Typography, Button } from "@material-ui/core"
import { CircularProgress, FormControlLabel, Checkbox } from "@material-ui/core"
function Login() {
  const [authDetails, setAuthDetails] = useState({ email: "", password: "" })
  const [rememberMe, setRememberMe] = useState(true)
  const handleEnter = (authDetails) => {
    if (!authDetails.email || !validateEmail(authDetails.email)) {
      toast.error("Please enter a valid email address")
    }
    if (
      !authDetails.password ||
      !(authDetails.password.toString().length > 7)
    ) {
      toast.error("Password must of at 8 letters")
    } else {
      handleSignUp(authDetails)
    }
  }

  const auth = getAuth()
  const [loading, setLoading] = useState(false)
  const handleSignUp = (authDetails) => {
    setLoading(true)

    if (!rememberMe) setPersistence(auth, inMemoryPersistence)
    else {
      setPersistence(auth, browserLocalPersistence)
    }
    signInWithEmailAndPassword(auth, authDetails.email, authDetails.password)
      .then((userCredential) => {
        // Signed in
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)

        console.log(error)
        if (error?.code === "auth/user-not-found") {
          toast.error("Email id not found. Please sign up.")
        }
        if (error?.code === "auth/wrong-password") {
          toast.error("Email and password do not match")
        } else toast.error("Some error occured.")
        // ..
      })
  }

  return (
    <Grid container xs={12} item justifyContent="center" spacing={4}>
      <Grid
        item
        container
        direction="column"
        // xs={12}
        style={{ margin: "1rem 0" }}
      >
        <Typography variant="h6" color="primary">
          To Continue
        </Typography>
        <Typography color="secondary">
          Sign In with your email and password
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={4}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleEnter(authDetails)
          }}
        >
          <Grid item xs={12} style={{ marginTop: "1rem" }}>
            <TextField
              variant="outlined"
              type="email"
              fullWidth
              label="Email"
              value={authDetails?.email}
              onChange={(e) =>
                setAuthDetails((prev) => ({ ...prev, email: e.target.value }))
              }
            ></TextField>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "1rem" }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={authDetails?.password}
              onChange={(e) =>
                setAuthDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            ></TextField>
          </Grid>
          <Grid item xs={12} style={{ margin: "0.5rem 0" }}>
            <FormControlLabel
              style={{ color: "gray", fontSize: "14px" }}
              control={
                <Checkbox
                  size="small"
                  checked={rememberMe}
                  color="primary"
                  onChange={(e) => {
                    setRememberMe(e.target.checked)
                  }}
                />
              }
              label={
                <>
                  Remember Me
                  <i
                    class="fas fa-question"
                    title="Closing the tab won't clear your session"
                    style={{ marginLeft: "0.3rem" }}
                  ></i>
                </>
              }
            />{" "}
          </Grid>
          <Grid item xs={12} style={{ marginTop: "1rem", textAlign: "center" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button fullWidth variant="contained" type="submit">
                Login
              </Button>
            )}
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default Login
