import { Grid } from "@material-ui/core"
import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useState } from "react"
import { useEffect } from "react"
import TaskColumn from "../../components/Projects/TaskColumn"
import { firebaseStore } from "../../firebase.config"
import { Typography, TextField } from "@material-ui/core"
import { getAuth } from "firebase/auth"
import { LinearProgress, makeStyles } from "@material-ui/core"
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
  const [tasks, setTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    handleSearch(searchQuery)
    //eslint-disable-next-line
  }, [searchQuery, allTasks])
  const auth = getAuth()
  const userId = auth?.currentUser?.uid
  const getTasks = (userId) => {
    setLoading(true)
    const q = query(
      collection(firebaseStore, "tasks"),
      where("userId", "==", userId)
    )

    getDocs(q)
      .then((res) => {
        const data = res.docs.map((ele) => ({
          ...ele.data(),
          id: ele.id,
        }))

        setAllTasks(data.slice())
        setTasks(data.slice())
        setLoading(false)
      })
      .catch((Err) => {
        setLoading(false)
      })
  }
  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      const filteredTasks = [...allTasks].filter(
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
  }, [userId])

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
                className="fa-solid fa-magnifying-glass"
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
              allTasks={allTasks}
              setTasks={setAllTasks}
              tasks={tasks.filter((ele) => ele.status === statusType.value)}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

export default Projects
