import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../../redux/student'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
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

const schema = yup.object().shape({
  company: yup.string().required(),
  position: yup.string().required(),
  responsibilities: yup.string().required(),
  start_date: yup.string().required(),
  end_date: yup.string().required(),
})

export const JobExpDialog = ({closeIt}) => {
  const classes = useStyles()
  const student = useSelector(state => state.student)
  const [open, setOpen] = React.useState(true)
  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()

  const hide = () => closeIt()

  const onSubmit = data => {
    const jobs = student.jobExperiences
    jobs.push(data)
    dispatch(actions.updateStudent({ job_experiences: jobs }))
    reset()
    hide()
  }

  const handleClose = () => {
    setOpen(false)
    hide()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Nueva Experiencia Laboral</DialogTitle>
      <DialogContent className={classes.content}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Controller
            as={TextField}
            className={classes.formControl}
            defaultValue=""
            variant="outlined"
            size="small"
            label="Empresa"
            name="company"
            control={control}
            error={Boolean(errors.company)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            className={classes.formControl}
            defaultValue=""
            variant="outlined"
            size="small"
            label="Posicion"
            name="position"
            control={control}
            error={Boolean(errors.position)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            as={TextField}
            className={classes.formControl}
            variant="outlined"
            defaultValue=""
            size="small"
            label="Responsabilidades"
            name="responsibilities"
            multiline
            rows={4}
            rowsMax={4}
            error={Boolean(errors.responsibilities)}
            control={control}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={TextField}
            className={classes.formControl}
            defaultValue=""
            type="month"
            variant="outlined"
            size="small"
            label="Comienzo"
            name="start_date"
            control={control}
            error={Boolean(errors.start_date)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={TextField}
            className={classes.formControl}
            defaultValue=""
            type="month"
            variant="outlined"
            size="small"
            label="Finalizacion"
            name="end_date"
            control={control}
            error={Boolean(errors.end_date)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} container justify={'space-around'}>
          <Button color="primary" className={classes.button} variant="text" onClick={hide}>
            Cancelar
          </Button>
          <Button color="primary" className={classes.button} variant="text" type="submit">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
      </DialogContent>
    </Dialog>
  )
}
