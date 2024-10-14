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

import "./App.css"

// Material UI components ( buttons, sliders, etc)
// https://mui.com/material-ui/all-components/

export function App() {
  const storedLogs = localStorage.getItem("logs")
  const initialLogs = storedLogs ? JSON.parse(storedLogs) : []
  const [pottyLogs, setPottyLogs] = useState(initialLogs)

  console.log(DateTime.now().toFormat("LLL dd, t"))

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
                aria-label="delete"
                className="deleteButton"
                color="secondary"
                onClick={() => {
                  const filteredLogs = pottyLogs.filter((currentLog) => {
                    return currentLog.id !== log.id
                  })

                  setPottyLogs(filteredLogs)
                  localStorage.setItem("logs", JSON.stringify(filteredLogs))
                }}
              >
                <DeleteIcon onClick={() => {}} />
              </IconButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}
