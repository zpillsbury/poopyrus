import DeleteIcon from "@mui/icons-material/Delete"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import { DateTime } from "luxon"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import pkg from "../package.json"
import "./App.css"

// Material UI components ( buttons, sliders, etc)
// https://mui.com/material-ui/all-components/

interface PottyLog {
  date: string
  type: string
  id: string
}

export function App() {
  const storedLogs = localStorage.getItem("log")
  const initialLogs: PottyLog[] = storedLogs ? JSON.parse(storedLogs) : []

  const [pottyLogs, setPottyLogs] = useState(initialLogs)
  const [confirmDeleteId, setConfirmDeleteId] = useState("")

  function addLog(pottyType: string) {
    // Luxon Date Time Formatting
    // https://moment.github.io/luxon/#/formatting

    const newLogs = [
      ...pottyLogs,
      {
        date: DateTime.now().toFormat("LLL dd, t"),
        type: pottyType,
        id: uuidv4(),
      },
    ]

    localStorage.setItem("log", JSON.stringify(newLogs))
    setPottyLogs(newLogs)
  }

  function deleteLog() {
    const filteredLogs = pottyLogs.filter((currentLog) => {
      return currentLog.id !== confirmDeleteId
    })

    setPottyLogs(filteredLogs)
    localStorage.setItem("log", JSON.stringify(filteredLogs))

    setConfirmDeleteId("")
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Tooltip title={pkg.version}>
            <Typography variant="h6" component="div" id="appbar-title">
              💩 Poopyrus notes
            </Typography>
          </Tooltip>
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
