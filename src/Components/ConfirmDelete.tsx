import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"

interface ConfirmDeleteProps {
  confirmDeleteId: string
  setConfirmDeleteId: (id: string) => void
  getLogs: () => void
  loading: boolean
  setLoading: (val: boolean) => void
}

export function ConfirmDelete({
  confirmDeleteId,
  setConfirmDeleteId,
  getLogs,
  loading,
  setLoading,
}: ConfirmDeleteProps) {
  // Deletes a log entry
  async function deleteLog() {
    setLoading(true)
    const deleteIt = await fetch(`http://localhost:8000/logs/${confirmDeleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer GeGntRBYuorgRbIg4aZV2CiHMcRaDz",
      },
    })

    if (!deleteIt.ok) {
      throw new Error(`Send status: ${deleteIt.status}`)
    } else {
      getLogs()
    }

    setConfirmDeleteId("")
    setLoading(false)
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
        <Button onClick={() => setConfirmDeleteId("")} disabled={loading}>
          No
        </Button>

        <Button onClick={deleteLog} disabled={loading}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
