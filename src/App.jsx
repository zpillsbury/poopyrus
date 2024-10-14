import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { DateTime } from "luxon"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { v4 as uuidv4 } from "uuid"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

import "./App.css"

// Material UI components ( buttons, sliders, etc)
// https://mui.com/material-ui/all-components/

export function App() {
  const storedLogs = localStorage.getItem("logs")
  const initialLogs = storedLogs ? JSON.parse(storedLogs) : []
  const [pottyLogs, setPottyLogs] = useState(initialLogs)
  const [confirmDeleteId, setConfirmDeleteId] = useState("")

  function addLog(pottyType) {
    // Luxon Date Time Formatting
    // https://moment.github.io/luxon/#/formatting

    console.log(pottyType)
    console.log(DateTime.now().toFormat("t"))

    const newLogs = [
      ...pottyLogs,
      {
        date: DateTime.now().toFormat("LLL dd, t"),
        type: pottyType,
        id: uuidv4(),
      },
    ]

    localStorage.setItem("logs", JSON.stringify(newLogs))
    setPottyLogs(newLogs)
  }

  function deleteLog() {
    const filteredLogs = pottyLogs.filter((currentLog) => {
      return currentLog.id !== confirmDeleteId
    })

    setPottyLogs(filteredLogs)
    localStorage.setItem("logs", JSON.stringify(filteredLogs))

    setConfirmDeleteId("")
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            💩 Poopyrus
          </Typography>
        </Toolbar>
      </AppBar>

      <div id="content">
        <h1>Potty Logger 9000 🪵</h1>

        <ButtonGroup disableElevation variant="outlined" color="secondary" size="large">
          <Button
            onClick={() => {
              addLog("pee")
            }}
          >
            💦
          </Button>

          <Button
            onClick={() => {
              addLog("poo")
            }}
          >
            💩
          </Button>
        </ButtonGroup>

        <Divider className="poop-divider" />

        {pottyLogs.map((log) => {
          return (
            <div key={log.id} className="entryLog">
              <Typography variant="h6" gutterBottom>
                {log.type === "poo" ? "💩" : "💦"} {log.date}
              </Typography>

              <IconButton
                className="deleteButton"
                color="secondary"
                onClick={() => {
                  setConfirmDeleteId(log.id)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )
        })}
      </div>

      {confirmDeleteId ? (
        <Dialog
          open={true}
          onClose={() => {
            setConfirmDeleteId("")
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Delete this log?"}</DialogTitle>

          <DialogActions>
            <Button onClick={() => setConfirmDeleteId("")}>No</Button>
            <Button onClick={deleteLog}>Yes</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  )
}
