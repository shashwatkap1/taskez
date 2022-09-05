import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"
import "./App.css"
import { useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

import "./firebase.config"
import { Route, Routes, useNavigate } from "react-router"
import Projects from "./views/Projects"
import Auth from "./views/Auth"
import Admin from "./views/Admin"
import { useEffect } from "react"
function App() {
  const navigate = useNavigate()
  const auth = getAuth()
  const user = auth.currentUser
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/projects")
      } else {
        navigate("/auth")
      }
    })
  }, [user])

  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="*" element={<Admin />}></Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={1}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
      />
    </div>
  )
}

export default App
