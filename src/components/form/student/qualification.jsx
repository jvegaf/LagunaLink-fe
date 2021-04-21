import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/student'

const schema = yup.object().shape({
  title: yup.string().required()
})

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3)
  },
  button: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  },
}))

export const QualificationForm = props => {
  const classes = useStyles()
  const { qualification, isBusy } = props
  const { control, handleSubmit, setValue, errors, formState, reset } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (qualification) {
      setValue('title', qualification.title)
      setValue('start_date', qualification.start_date)
      setValue('end_date', qualification.end_date)
    }
  }, [qualification])

  const onSubmit = data => {
    dispatch(actions.updateStudent({qualification: data}))
    reset()
  }

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller as={TextField} className={classes.formControl} defaultValue="" variant="outlined" size="small" label="Titulacion" name="title" 
              control={control} error={Boolean(errors.title)} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
          <Controller as={TextField} className={classes.formControl} defaultValue="" type="month" variant="outlined" size="small" label="Comienzo" name="start_date" 
            control={control} error={Boolean(errors.start_date)} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
          <Controller as={TextField} className={classes.formControl} defaultValue="" type="month" variant="outlined" size="small" label="Finalizacion" name="end_date" 
            control={control} error={Boolean(errors.end_date)} fullWidth/>
          </Grid>
          <Grid item xs={12} hidden={!formState.isDirty}>
            <Button color="primary" className={classes.button} disabled={isBusy} variant="text" type="submit" fullWidth>
              Guardar 
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
