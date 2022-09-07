import React from "react"
import { useDrag } from "react-dnd"
import {
  Grid,
  Typography,
  TextField,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core"
import { getAuth } from "firebase/auth"
import { colors } from "../../../colors"
import moment from "moment"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { firebaseStore } from "../../../firebase.config"
import { toast } from "react-toastify"
import { playSuccessSound } from "../../../helper"
function Task({ task, setTasks }) {
  const [data, setData] = useState({ ...task })
  const [loading, setLoading] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Task",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  const auth = getAuth()
  const handleUpdateDoc = (data) => {
    setLoading(true)

    const dbRef = doc(firebaseStore, "tasks", task.id)
    updateDoc(dbRef, { ...data })
      .then((Res) => {
        setLoading(false)
        setTasks((prev) => {
          const currTasks = prev.slice()
          const idx = currTasks.findIndex((ele) => ele.id === task.id)
          if (idx !== -1) {
            currTasks[idx] = { ...data }
            return currTasks
          } else return prev
        })

        setEditModalOpen(false)
        playSuccessSound()
        toast.success("Task updated successfully")
      })
      .catch((err) => {
        setLoading(false)

        toast.error("Some error occured. Please refresh the page")
      })
  }
  return (
    <Grid
      ref={drag}
      onClick={() => (!editModalOpen ? setEditModalOpen(true) : () => {})}
      style={{
        background: "#FFFFFF",
        boxShadow: "0px 0px 28px rgba(72, 174, 174, 0.07)",
        borderRadius: "7px",
        border: isDragging ? "1px dashed black" : "none",
        opacity: isDragging ? "0.9" : 1,
        padding: "1rem",
        marginBottom: "1rem",
        cursor: isDragging ? "grab" : "pointer",
        position: "relative",
      }}
      container
    >
      <Grid item xs={12} container direction="column">
        <Grid item xs={12}>
          <Typography variant="h5">{task.name}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "0.5rem" }}>
        <Typography style={{ color: "#6B6B6B" }} varaint="h6">
          {task.description}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        style={{ marginTop: "0.5rem" }}
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Avatar
          style={{
            height: "25px",
            width: "25px",
            fontSize: "15px",
            marginRight: "0.5rem",
            background: colors.secondary,
          }}
          color="primary"
        >
          {auth.currentUser?.displayName?.substring(0, 1)}
        </Avatar>
        <Typography variant="body2" color="secondary">
          {moment(task?.createdAt).format("MMM DD, hh:mm A")}
        </Typography>
      </Grid>
      {editModalOpen ? (
        <Dialog
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          maxWidth="xs  "
        >
          <DialogTitle>
            <Typography variant="h5">Edit Task</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdateDoc(data)
                  }}
                >
                  <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus={true}
                        value={data.name}
                        fullWidth
                        label="Name"
                        placeholder="Give your task a title"
                        inputProps={{ maxLength: 30 }}
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }}
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        placeholder="Description..."
                        value={data.description}
                        inputProps={{ maxLength: 300 }}
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }}
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    {loading ? (
                      <Grid item xs={12} style={{ textAlign: "center" }}>
                        <CircularProgress color="primary" />
                      </Grid>
                    ) : (
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent="flex-end"

                        // spacing={1}
                      >
                        <Grid item>
                          <Button
                            onClick={() => setEditModalOpen(false)}
                            color="secondary"
                            variant="contained"
                          >
                            Discard
                          </Button>
                        </Grid>
                        <Grid item style={{ paddingLeft: "0.3rem" }}>
                          <Button variant="contained" fullWidth type="submit">
                            Done
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      ) : null}
    </Grid>
  )
}

export default Task
