import { makeStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import { JobOpeningForm } from '../../../form/company/jobOpeningForm'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  content: {
    overflowY: 'hidden',
  },
}))




export const JobOpenDialog = ({ closeIt }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const hide = () => closeIt()

  const formProps = { hide, viewer: false}

  const handleClose = () => {
    setOpen(false)
    hide()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{`Oferta de Trabajo`} </DialogTitle>
      <DialogContent className={classes.content}>
        <JobOpeningForm {...formProps} />
      </DialogContent>
    </Dialog>
  )
}
