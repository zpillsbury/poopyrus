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
import { useEffect, useState } from "react"

import { CircularProgress } from "@mui/material"
import pkg from "../package.json"
import "./App.css"
import { ConfirmDelete } from "./Components/ConfirmDelete"
import { Log, PottyLog } from "./Components/Log"

// Material UI components ( buttons, sliders, etc)
// https://mui.com/material-ui/all-components/

export function App() {
  const [pottyLogs, setPottyLogs] = useState<PottyLog[]>([])
  const [confirmDeleteId, setConfirmDeleteId] = useState("")
  const [loading, setLoading] = useState(false)
  const [calDate, setCalDate] = useState(DateTime.now())
  const filteredPottyLogs = pottyLogs.filter((log) => {
    const logDate = DateTime.fromISO(log.date)
    return logDate.toISODate() === calDate.toISODate()
  })

  useEffect(() => {
    async function getLogs() {
      setLoading(true)

      const response = await fetch("http://localhost:8000/logs", {
        method: "GET",
        headers: { Authorization: "Bearer GeGntRBYuorgRbIg4aZV2CiHMcRaDz" },
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const data = await response.json()
      setPottyLogs(data)

      setLoading(false)
    }

    getLogs()
  }, [])

  async function getLogs() {
    const response = await fetch("http://localhost:8000/logs", {
      method: "GET",
      headers: { Authorization: "Bearer GeGntRBYuorgRbIg4aZV2CiHMcRaDz" },
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const data = await response.json()
    setPottyLogs(data)
  }

  async function addLog(pottyType: string) {
    // Luxon Date Time Formatting
    // https://moment.github.io/luxon/#/formatting

    const send = await fetch("http://localhost:8000/logs", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer GeGntRBYuorgRbIg4aZV2CiHMcRaDz",
      },
      body: JSON.stringify({ date: DateTime.now().toISO(), type: pottyType, name: "apps" }),
    })

    if (!send.ok) {
      throw new Error(`Send status: ${send.status}`)
    } else {
      getLogs()
    }
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
                  disabled={loading}
                  variant="outlined"
                  sx={{ width: 145 }}
                  color="secondary"
                  onClick={async () => {
                    setLoading(true)

                    await addLog("pee")

                    setLoading(false)
                  }}
                >
                  💦
                </Button>
                <Button
                  size="large"
                  disabled={loading}
                  variant="outlined"
                  sx={{ width: 145 }}
                  color="secondary"
                  onClick={async () => {
                    setLoading(true)

                    await addLog("poo")

                    setLoading(false)
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
              {loading ? (
                <CircularProgress />
              ) : (
                <List sx={{ width: "100%" }}>
                  {filteredPottyLogs.length > 0 ? (
                    filteredPottyLogs.reverse().map((log) => {
                      return (
                        <Log
                          key={log.id}
                          log={log}
                          getLogs={getLogs}
                          setConfirmDeleteId={setConfirmDeleteId}
                        />
                      )
                    })
                  ) : (
                    <Typography variant="h6">No logs found 🤷‍♂️</Typography>
                  )}
                </List>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>

      {confirmDeleteId ? (
        <ConfirmDelete
          setConfirmDeleteId={setConfirmDeleteId}
          confirmDeleteId={confirmDeleteId}
          getLogs={getLogs}
          loading={loading}
          setLoading={setLoading}
        />
      ) : null}
    </div>
  )
}
