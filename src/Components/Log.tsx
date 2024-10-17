import DeleteIcon from "@mui/icons-material/Delete"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import SaveIcon from "@mui/icons-material/Save"
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { DateTime } from "luxon"
import { useState } from "react"

export interface PottyLog {
  date: string
  type: string
  id: string
}

interface LogProps {
  log: PottyLog
  setConfirmDeleteId: (id: string) => void
}

export function Log({ log, setConfirmDeleteId }: LogProps) {
  const [note, setNote] = useState(localStorage.getItem(log.id) ?? "")
  const [noteOpen, setNoteOpen] = useState(false)

  return (
    <Box sx={{ width: 320 }}>
      <ListItem
        secondaryAction={
          <Box>
            <IconButton
              className="deleteButton"
              color="secondary"
              onClick={() => {
                setConfirmDeleteId(log.id)
              }}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              className="deleteButton"
              color="secondary"
              onClick={() => {
                setNoteOpen(!noteOpen)
              }}
            >
              {noteOpen ? <SaveIcon /> : <NoteAddIcon />}
            </IconButton>
          </Box>
        }
      >
        <ListItemIcon>
          <Typography variant="h4">{log.type === "poo" ? "💩" : "💦"}</Typography>
        </ListItemIcon>

        <ListItemText
          primary={DateTime.fromISO(log.date).toFormat("LLL dd, t")}
          secondary={log.type === "poo" ? "Poo" : "Pee"}
        />
      </ListItem>

      <Box sx={{ mb: 2 }}>
        {noteOpen ? (
          <TextField
            sx={{ width: "100%" }}
            label="Potty log"
            multiline
            rows={4}
            value={note}
            onChange={(e) => {
              setNote(e.target.value)

              localStorage.setItem(log.id, e.target.value)
            }}
          />
        ) : (
          <Typography variant="body2">{note}</Typography>
        )}
      </Box>
    </Box>
  )
}
