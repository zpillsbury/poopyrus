import DeleteIcon from "@mui/icons-material/Delete"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import { DateTime } from "luxon"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { IconButton, ListItemIcon } from "@mui/material"
import React from "react"
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

  const [value, setValue] = React.useState(DateTime.fromISO("2024-04-17"))

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

        <Grid container spacing={2}>
          <Grid size={4}>
            <Box sx={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                  <DemoItem>
                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Grid>

          <Grid size={8}>
            {pottyLogs.map((log) => {
              return <Log key={log.id} log={log} setConfirmDeleteId={setConfirmDeleteId} />
            })}
          </Grid>
        </Grid>

        <Divider className="poop-divider" />
        <Box sx={{ maxWidth: 450 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Typography variant="h4">💩</Typography>
              </ListItemIcon>
              <ListItemText primary="Oct 16, 3:34 PM" secondary="Poo" />
            </ListItem>

            <ListItem
              secondaryAction={
                <Box>
                  <IconButton
                    className="deleteButton"
                    color="secondary"
                    onClick={() => {
                      setConfirmDeleteId("")
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    className="deleteButton"
                    color="secondary"
                    onClick={() => {
                      console.log("not")
                    }}
                  >
                    <NoteAddIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemIcon>
                <Typography variant="h4">💦</Typography>
              </ListItemIcon>
              <ListItemText primary="Oct 16, 3:34 PM" secondary="Pee" />
            </ListItem>
          </List>
        </Box>
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
