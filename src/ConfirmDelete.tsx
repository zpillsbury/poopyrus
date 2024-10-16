import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import { PottyLog } from "./Log"

interface ConfirmDeleteProps {
  pottyLogs: PottyLog[]
  confirmDeleteId: string
  setPottyLogs: (logs: PottyLog[]) => void
  setConfirmDeleteId: (id: string) => void
}

export function ConfirmDelete({
  pottyLogs,
  confirmDeleteId,
  setPottyLogs,
  setConfirmDeleteId,
}: ConfirmDeleteProps) {
  // Deletes a log entry
  function deleteLog() {
    const filteredLogs = pottyLogs.filter((currentLog) => {
      return currentLog.id !== confirmDeleteId
    })

    setPottyLogs(filteredLogs)
    localStorage.setItem("log", JSON.stringify(filteredLogs))

    setConfirmDeleteId("")
  }

  return (
    <Dialog
      open={true}
      onClose={() => {
        setConfirmDeleteId("")
      }}
    >
      <DialogTitle id="alert-dialog-title">{"Delete this log?"}</DialogTitle>

      <DialogActions>
        <Button onClick={() => setConfirmDeleteId("")}>No</Button>
        <Button onClick={deleteLog}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}
