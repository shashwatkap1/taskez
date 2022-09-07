import React from "react"
import { useDrop } from "react-dnd"
import Task from "../Task"
import { Grid, Typography, Button, TextField } from "@material-ui/core"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { firebaseStore } from "../../../firebase.config"
import { toast } from "react-toastify"
import { useState } from "react"
import moment from "moment"
import { CircularProgress } from "@material-ui/core"
import { getAuth } from "firebase/auth"
import { playSuccessSound } from "../../../helper"

function TaskColumn({ column, tasks, setTasks, allTasks }) {
  const auth = getAuth()
  const [loading, setLoading] = useState(false)
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "Task",
      drop: (item) => {
        if (item.status !== column.value) {
          setTasks((prev) => {
            const currTasks = prev.slice()
            const idx = currTasks.findIndex((ele) => ele.id === item.id)

            if (idx !== -1) {
              currTasks.splice(idx, 1)
              currTasks.splice(0, 0, {
                ...item,
                status: column.value,
              })
              return currTasks
            } else return prev
          })
          const dbRef = doc(firebaseStore, "tasks", item.id)
          setDoc(dbRef, {
            ...item,
            status: column.value,
          })
            .then((res) => {})
            .catch((err) => {
              console.log(err)
              toast.error("Some error occured. Please refresh the page")
            })
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  )
  const defaultNewTask = {
    name: "",
    description: "",
    status: column.value,
  }
  const [newTask, setNewTask] = useState(null)
  const handleAddTask = () => {
    if (newTask) {
      toast.warning("Please submit this task before adding new")
    } else setNewTask(defaultNewTask)
  }
  const handleSubmitTask = (task) => {
    if (!task.name) toast.error("Please enter the title for the task")
    if (!task.description)
      toast.error("Please enter the description for the task")
    else {
      setLoading(true)
      addDoc(collection(firebaseStore, "tasks"), {
        ...newTask,
        userId: auth.currentUser.uid,
        createdAt: moment(new Date()).toISOString(true),
      })
        .then((res) => {
          setLoading(false)

          setNewTask(null)
          playSuccessSound()
          setTasks((prev) => {
            const curr = [...prev]
            curr.splice(0, 0, {
              ...newTask,
              userId: auth.currentUser.uid,
              createdAt: moment(new Date()).toISOString(true),
              id: res.id,
            })
            return curr
          })

          toast.success("Task added successfully")
        })
        .catch((err) => {
          setLoading(false)

          console.log(err)
        })
    }
  }
  return (
    <Grid
      item
      container
      alignItems="flex-start"
      style={{
        background: "#F5F9F9",
        borderRadius: "15px",
        padding: "1rem",
        marginRight: "2rem",
        overflowY: "auto",
        width: "300px",
        maxWidth: "300px",
      }}
      ref={drop}
      spacing={2}
    >
      <Grid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">{column.label}</Typography>
        <div
          style={{
            background: "#ECF3F3",
            borderRadius: "7px",
            color: "#329C89",
            height: "26px",
            width: "23px",
            fontWeight: "500",
            fontSize: "20px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          {tasks.length}
        </div>
      </Grid>
      <Grid item xs={12}>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          style={{
            background: "#ECF3F3",
            borderRadius: "7px",
            color: "#329C89",
          }}
          onClick={() => {
            handleAddTask()
          }}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </Grid>
      <Grid container item xs={12}>
        {newTask ? (
          <Grid
            style={{
              background: "#FFFFFF",
              boxShadow: "0px 0px 28px rgba(72, 174, 174, 0.07)",
              borderRadius: "7px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
            container
            xs={12}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmitTask(newTask)
              }}
            >
              <Grid item xs={12} container direction="row" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus={true}
                    value={newTask.name}
                    fullWidth
                    placeholder="Give your task a title"
                    inputProps={{ maxLength: 30 }}
                    onChange={(e) => {
                      setNewTask((prev) => ({ ...prev, name: e.target.value }))
                    }}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder="Description..."
                    value={newTask.description}
                    inputProps={{ maxLength: 300 }}
                    onChange={(e) => {
                      setNewTask((prev) => ({
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
                    justifyContent="space-between"
                    // spacing={1}
                  >
                    <Grid item>
                      <Button
                        onClick={() => {
                          setNewTask(null)
                        }}
                        color="secondary"
                        variant="contained"
                      >
                        Discard
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" fullWidth type="submit">
                        Done
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </form>
          </Grid>
        ) : null}
        {isOver ? (
          <Grid
            item
            xs={12}
            style={{
              border: "2px solid #6B6B6B",
              borderRadius: "12px",
              minHeight: "100px",

              borderStyle: "dotted",
              minWidth: "100px",
              marginBottom: "1rem",
            }}
          ></Grid>
        ) : null}
        {tasks.map((task) => {
          if (task.status !== column.value) return null
          else {
            return (
              <Task
                task={task}
                key={task.id}
                allTasks={allTasks}
                setTasks={setTasks}
              />
            )
          }
        })}
      </Grid>
    </Grid>
  )
}

export default TaskColumn
