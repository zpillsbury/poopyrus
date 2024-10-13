import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { DateTime } from "luxon"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"

import "./App.css"

export function App() {
  const storedLogs = localStorage.getItem("logs")
  const initialLogs = storedLogs ? JSON.parse(storedLogs) : []
  const [pottyLogs, setPottyLogs] = useState(initialLogs)

  function addLog(pottyType) {
    console.log(pottyType)
    console.log(DateTime.now().toFormat("t"))

    const newLogs = [
      ...pottyLogs,
      {
        date: DateTime.now().toFormat("t"),
        type: pottyType,
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

        {pottyLogs.map((log, index) => {
          return (
            <Typography variant="h6" gutterBottom key={index}>
              {log.type === "poo" ? "💩" : "💦"} {log.date}
            </Typography>
          )
        })}
      </div>
    </div>
  )
}
