import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/company'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  content: {
    overflowY: 'hidden'
  }
}))

const schema = yup.object().shape({
  position: yup.string().required(),
  description: yup.string().required(),
  responsibilities: yup.string().required(),
  conditions: yup.string().required(),
  qualification: yup.string().required(),
  prevExperience: yup.string().required(),
})

export const JobOpenDialog = ({closeIt}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()
  
  const hide = () => closeIt()

  const onSubmit = data => {
    dispatch(actions.addJobOpening(data))
    reset()
    hide()
  }

  const handleClose = () => {
    setOpen(false)
    hide()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{`Oferta de Trabajo`} </DialogTitle>
      <DialogContent className={classes.content}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
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
            defaultValue=""
            variant="outlined"
            size="small"
            multiline
            rows={4}
            rowsMax={4}
            label="Descripcion"
            name="description"
            control={control}
            error={Boolean(errors.description)}
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
        <Grid item xs={12}>
          <Controller
            as={TextField}
            className={classes.formControl}
            defaultValue=""
            variant="outlined"
            size="small"
            multiline
            rows={4}
            rowsMax={4}
            label="Condiciones"
            name="conditions"
            control={control}
            error={Boolean(errors.conditions)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={TextField}
            className={classes.formControl}
            defaultValue=""
            variant="outlined"
            size="small"
            label="Titulacion requerida"
            name="qualification"
            control={control}
            error={Boolean(errors.qualification)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={TextField}
            className={classes.formControl}
            defaultValue=""
            variant="outlined"
            size="small"
            label="Experiencia requerida"
            name="prevExperience"
            control={control}
            error={Boolean(errors.prevExperience)}
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
