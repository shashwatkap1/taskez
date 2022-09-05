import { Grid } from "@material-ui/core"
import {
  collection,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore"
import React, { useState } from "react"
import { useEffect } from "react"
import TaskColumn from "../../components/Projects/TaskColumn"
import { firebaseStore } from "../../firebase.config"
import { Typography, TextField } from "@material-ui/core"
import { toast } from "react-toastify"
import { getAuth } from "firebase/auth"
import { LinearProgress, makeStyles } from "@material-ui/core"
import moment from "moment"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}))
function Projects() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const statusType = [
    { label: "To do", value: "todo" },
    { label: "In Progress", value: "inProgress" },
    { label: "Completed", value: "completed" },
  ]
  const projectsData = [
    {
      name: "Say hi to colleagues1",
      id: "1",
      status: "todo",
      description: "Cutie Pie",
    },
    {
      name: "Say hi to colleagues2",
      id: "2",
      status: "todo",
      description: "Cutie Pie",
    },
    {
      name: "Say hi to colleagues3",
      id: "3",
      status: "completed",
      description: "Cutie Pie",
    },
    {
      name: "Say hi to colleagues4",
      id: "4",
      status: "inProgress",
      description: "Cutie Pie",
    },
    {
      name: "Say hi to colleagues5",
      id: "5",
      status: "inProgress",
      description: "Cutie Pie2",
    },
  ]
  const [tasks, setTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    handleSearch(searchQuery)
  }, [searchQuery, allTasks])
  const auth = getAuth()
  const [updater, setUpdater] = useState(false)
  const userId = auth?.currentUser?.uid
  const getTasks = (userId) => {
    setLoading(true)
    const q = query(
      collection(firebaseStore, "tasks"),
      where("userId", "==", userId)
    )

    getDocs(q)
      .then((res) => {
        console.log(res.docs.map((ele) => ({ ...ele.data(), id: ele.id })))
        setAllTasks([
          ...res.docs.map((ele) => ({
            ...ele.data(),
            id: ele.id,
          })),
        ])
        setTasks([
          ...res.docs.map((ele) => ({
            ...ele.data(),
            id: ele.id,
          })),
        ])
        setLoading(false)
      })
      .catch((Err) => {
        setLoading(false)
      })
  }
  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      const filteredTasks = allTasks.filter(
        (ele) =>
          ele.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ele.description.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setTasks([...filteredTasks])
    } else {
      setTasks([...allTasks])
    }
  }
  useEffect(() => {
    if (userId) getTasks(userId)
  }, [userId, updater])
  const changeTaskStatus = (task, status) => {
    const currTasks = [...allTasks]
    console.log(allTasks, task, status)
    const index = allTasks.findIndex((ele) => ele.id === task.id)
    console.log(task, status, index, allTasks)
    if (index !== -1) {
      const oldStatus = task.status
      // setDoc(collection(firebaseStore, `tasks/${task.id}`), {
      //   ...task,
      //   status: status,
      // })
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     // currTasks[index] = { ...currTasks[index], status: status }
      //     // setTasks([...currTasks])
      //     console.log(err)
      //     toast.error("Some error ocucred. Please refresh the page")
      //   })
      currTasks[index] = { ...currTasks[index], status: status }
      // setTasks(currTasks)
    }
    // setTasks([...currTasks])
  }
  return (
    <Grid container>
      {loading ? (
        <div className={classes.root} style={{ margin: "1rem 0" }}>
          <LinearProgress color="primary"></LinearProgress>
        </div>
      ) : null}
      <Grid item xs={6}>
        <TextField
          label="Search"
          fullWidth
          value={searchQuery}
          helperText={
            searchQuery
              ? `showing ${tasks.length} of ${allTasks.length} results`
              : null
          }
          variant="outlined"
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          InputProps={{
            startAdornment: (
              <i
                class="fa-solid fa-magnifying-glass"
                style={{ marginRight: "0.3rem" }}
              ></i>
            ),
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} style={{ margin: "2rem 0 " }}>
        <Typography variant="h4">Projects</Typography>
      </Grid>
      <Grid container item xs={12} alignItems="baseline" spacing={2}>
        {statusType.map((statusType) => {
          return (
            <TaskColumn
              column={statusType}
              key={statusType.value}
              setTasks={setAllTasks}
              tasks={tasks.filter((ele) => ele.status === statusType.value)}
              changeTaskStatus={changeTaskStatus}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

export default Projects
