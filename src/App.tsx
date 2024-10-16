import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Divider from "@mui/material/Divider"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import { DateTime } from "luxon"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import pkg from "../package.json"
import "./App.css"
import { ConfirmDelete } from "./Components/ConfirmDelete"
import { Log, PottyLog } from "./Components/Log"

// Material UI components ( buttons, sliders, etc)
// https://mui.com/material-ui/all-components/

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

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Tooltip title={pkg.version}>
            <Typography variant="h6" component="div" id="appbar-title">
              💩 Poopyrus
            </Typography>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div id="content">
        <Typography variant="h4" gutterBottom>
          Add Log 🪵
        </Typography>

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

        <Typography variant="h4" gutterBottom>
          Logs 📝
        </Typography>

        {pottyLogs.map((log) => {
          return <Log key={log.id} log={log} setConfirmDeleteId={setConfirmDeleteId} />
        })}
      </div>

      {confirmDeleteId ? (
        <ConfirmDelete
          pottyLogs={pottyLogs}
          setConfirmDeleteId={setConfirmDeleteId}
          confirmDeleteId={confirmDeleteId}
          setPottyLogs={setPottyLogs}
        />
      ) : null}
    </div>
  )
}
