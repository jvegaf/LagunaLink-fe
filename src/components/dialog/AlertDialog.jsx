import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export const AlertDialog = props => {
  const { open, title, body, handleOK, handleCancel } = props

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOK} color="primary" autoFocus>
          Aceptar
        </Button>
        {handleCancel && (
          <Button onClick={handleCancel} color="primary" autoFocus>
            Cancelar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
