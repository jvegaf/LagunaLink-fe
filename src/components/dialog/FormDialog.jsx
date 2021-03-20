import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'

export const FormDialog = props => {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
    props.cb()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>{props.body}</DialogContent>
    </Dialog>
  )
}
