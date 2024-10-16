import DeleteIcon from "@mui/icons-material/Delete"
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
  const [note, setNote] = useState("")

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
      </div>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Potty log"
          multiline
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Box>
    </div>
  )
}