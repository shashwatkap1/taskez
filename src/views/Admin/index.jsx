import React from "react"
import { Route, Routes } from "react-router"
import Sidebar from "../../components/Sidebar"
import Projects from "../Projects"
import { Grid, Typography } from "@material-ui/core"
import { getAuth } from "firebase/auth"
import { collection, getDoc } from "firebase/firestore"
import { firebaseStore } from "../../firebase.config"
import { useEffect } from "react"
import { useState } from "react"
function Admin() {
  const [userName, setUserName] = useState("")
  const auth = getAuth()
  const user = auth?.currentUser

  return (
    <>
      <Sidebar />
      <div
        style={{
          marginLeft: "15rem",
          position: "relative",
          padding: "2rem 6rem",
        }}
      >
        <Grid item xs={12} container style={{ marginBottom: "1rem" }}>
          <Typography variant="h5">👋 Hey, {user?.displayName}</Typography>
        </Grid>
        <Routes>
          <Route element={<Projects />} path="*" />
        </Routes>
      </div>
    </>
  )
}

export default Admin
