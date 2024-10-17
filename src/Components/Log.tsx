import DeleteIcon from "@mui/icons-material/Delete"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import RemoveIcon from "@mui/icons-material/Remove"
import { Box } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
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
    <div>
      <div className="entryLog">
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

        <IconButton
          className="deleteButton"
          color="secondary"
          onClick={() => {
            setNoteOpen(!noteOpen)
          }}
        >
          {noteOpen ? <RemoveIcon /> : <NoteAddIcon />}
        </IconButton>
      </div>

      <Box sx={{ mb: 2 }}>
        {noteOpen ? (
          <TextField
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
    </div>
  )
}
