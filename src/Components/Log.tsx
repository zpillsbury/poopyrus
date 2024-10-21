import DeleteIcon from "@mui/icons-material/Delete"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import SaveIcon from "@mui/icons-material/Save"
import { Box, Button, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { DateTime } from "luxon"
import { useState } from "react"

export interface PottyLog {
  date: string
  type: string
  name: string
  note: string | null
  id: string
}

interface LogProps {
  log: PottyLog
  setConfirmDeleteId: (id: string) => void
  getLogs: () => void
}

export function Log({ log, setConfirmDeleteId, getLogs }: LogProps) {
  const [note, setNote] = useState(log.note ?? "")
  const [noteOpen, setNoteOpen] = useState(false)

  async function updateLog() {
    const send = await fetch(`http://localhost:8000/logs/${log.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer GeGntRBYuorgRbIg4aZV2CiHMcRaDz",
      },
      body: JSON.stringify({ note: note }),
    })

    if (!send.ok) {
      throw new Error(`Send status: ${send.status}`)
    } else {
      getLogs()
    }
  }

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
          <Box>
            <TextField
              sx={{ width: "100%" }}
              label="Potty log"
              multiline
              rows={4}
              value={note}
              onChange={(e) => {
                setNote(e.target.value)
              }}
            />

            <Button
              size="large"
              variant="outlined"
              color="secondary"
              onClick={async () => {
                await updateLog()
              }}
            >
              submit
            </Button>
          </Box>
        ) : (
          <Typography variant="body2">{note}</Typography>
        )}
      </Box>
    </Box>
  )
}
