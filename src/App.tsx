import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import List from "@mui/material/List"
import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import { DateTime } from "luxon"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import React from "react"
import pkg from "../package.json"
import "./App.css"
import { ConfirmDelete } from "./Components/ConfirmDelete"
import { Log, PottyLog } from "./Components/Log"

// Material UI components ( buttons, sliders, etc)
// https://mui.com/material-ui/all-components/

export function App() {
  const storedLogs = localStorage.getItem("logEntries")
  const initialLogs: PottyLog[] = storedLogs ? JSON.parse(storedLogs) : []

  const [pottyLogs, setPottyLogs] = useState(initialLogs)
  const [confirmDeleteId, setConfirmDeleteId] = useState("")
  const [calDate, setCalDate] = React.useState(DateTime.now())

  const filteredPottyLogs = pottyLogs.filter((log) => {
    const logDate = DateTime.fromISO(log.date)
    return logDate.toISODate() === calDate.toISODate()
  })

  function addLog(pottyType: string) {
    // Luxon Date Time Formatting
    // https://moment.github.io/luxon/#/formatting

    const newLogs = [
      ...pottyLogs,
      {
        date: DateTime.now().toISO(),
        type: pottyType,
        id: uuidv4(),
      },
    ]

    localStorage.setItem("logEntries", JSON.stringify(newLogs))
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
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 4 }}></Grid>

          <Grid size={{ sm: 12, md: 8 }}>
            <Box sx={{ display: "flex", alignItems: "flex-end", ml: 2 }}>
              <Stack direction="row" spacing={2}>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{ width: 145 }}
                  color="secondary"
                  onClick={() => {
                    addLog("pee")
                  }}
                >
                  💦
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{ width: 145 }}
                  color="secondary"
                  onClick={() => {
                    addLog("poo")
                  }}
                >
                  💩
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 4 }}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateCalendar
                sx={{ marginLeft: 0, marginRight: 0 }}
                value={calDate}
                onChange={(newValue) => setCalDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ sm: 12, md: 8 }}>
            <Box>
              <List sx={{ width: "100%" }}>
                {filteredPottyLogs.length > 0 ? (
                  filteredPottyLogs.reverse().map((log) => {
                    return <Log key={log.id} log={log} setConfirmDeleteId={setConfirmDeleteId} />
                  })
                ) : (
                  <Typography variant="h6">No logs found 🤷‍♂️</Typography>
                )}
              </List>
            </Box>
          </Grid>
        </Grid>
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
