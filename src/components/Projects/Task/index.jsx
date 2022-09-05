import React from "react"
import { useDrag } from "react-dnd"
import { Grid, Typography, TextField, Avatar } from "@material-ui/core"
import { getAuth } from "firebase/auth"
import { colors } from "../../../colors"
import moment from "moment"
function Task({ task }) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "Task",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  const auth = getAuth()

  return (
    <Grid
      ref={drag}
      onClick={() => alert("Hello")}
      style={{
        background: "#FFFFFF",
        boxShadow: "0px 0px 28px rgba(72, 174, 174, 0.07)",
        borderRadius: "7px",
        opacity: isDragging ? "0.4" : 1,
        padding: "1rem",
        marginBottom: "1rem",
        cursor: "grab",
      }}
      container
      xs={12}
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
    </Grid>
  )
}

export default Task
