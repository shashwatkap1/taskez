import React from "react"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import { useState } from "react"
import { toast } from "react-toastify"
import { addDoc, collection } from "firebase/firestore"
import { firebaseStore } from "../../../firebase.config"
import { validateEmail } from "../../../helper"
import { Grid, TextField, Button } from "@material-ui/core"
import { CircularProgress, FormControlLabel, Checkbox } from "@material-ui/core"
function SignUp() {
  const [authDetails, setAuthDetails] = useState(null)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const handleEnter = (authDetails) => {
    if (!authDetails?.name) {
      toast.error("Please enter your name.")
    }
    if (!authDetails?.email || !validateEmail(authDetails?.email)) {
      toast.error("Please enter a valid email address")
    }
    if (
      !authDetails?.password ||
      !(authDetails?.password.toString().length > 7)
    ) {
      toast.error("Password must of at 8 letters")
    } else {
      handleSignUp(authDetails)
    }
  }

  const auth = getAuth()

  const handleSignUp = (authDetails) => {
    if (!rememberMe) setPersistence(auth, inMemoryPersistence)
    else {
      setPersistence(auth, browserLocalPersistence)
    }
    setLoading(true)
    createUserWithEmailAndPassword(
      auth,
      authDetails?.email,
      authDetails?.password
    )
      .then((userCredential) => {
        setLoading(false)

        const user = userCredential.user
        updateProfile(user, { displayName: authDetails.name }).then((res) => {})
        addDoc(collection(firebaseStore, "users"), {
          uid: user.uid,
          name: authDetails.name,
          email: authDetails.email,
        })
          .then((res) => {})
          .catch((err) => {
            console.log(err)
          })
        // Signed in
      })
      .catch((error) => {
        setLoading(false)

        console.log(error.code)
        if (error?.code === "auth/email-already-in-use")
          toast.error("Email already exists. Please proceed to login")
        else toast.error("Some error occured.")
        // ..
      })
  }

  return (
    <Grid item xs={12} container spacing={2}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleEnter(authDetails)
        }}
      >
        <Grid item xs={12} style={{ marginTop: "1rem" }}>
          <TextField
            variant="outlined"
            label="Full Name"
            fullWidth
            className="bg-blue input"
            type="text"
            value={authDetails?.name}
            onChange={(e) =>
              setAuthDetails((prev) => ({ ...prev, name: e.target.value }))
            }
          ></TextField>
        </Grid>
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
                checked={rememberMe}
                size="small"
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
            <CircularProgress color="primary" />
          ) : (
            <Button fullWidth variant="contained" type="submit">
              Sign Up{" "}
            </Button>
          )}
        </Grid>
      </form>
    </Grid>
  )
}

export default SignUp
