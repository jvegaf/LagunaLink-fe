/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  content: {
    overflowY: 'hidden'
  }
}))

export const FormDialog = props => {
  const {open, title, body, hide} = props
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={hide} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{body}</DialogContent>
    </Dialog>
  )
}
