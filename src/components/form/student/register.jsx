import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/student'

const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  lastname: yup.string().required()
})

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  button: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  },
}))


export const StudentForm = props => {
  const classes = useStyles()
  const { newRegistry, email, name, surname, lastname } = props
  const { control, handleSubmit, setValue, errors, formState, reset } = useForm({
    resolver: yupResolver(schema),
  })
  const [isBusy, setIsBusy] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (newRegistry !== true) {
      setValue('email', email)
      setValue('name', name)
      setValue('surname', surname)
      setValue('lastname', lastname)
    }
  }, [newRegistry])

  const onSubmit = data => {
    setIsBusy(true)
    if (newRegistry === true){
      dispatch(actions.registerStudent(data))
      reset()
      return
    }
    dispatch(actions.updateStudent(data))
    reset()
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item hidden={newRegistry} xs={12}>
            <TextField className={classes.formControl} size="small" variant="outlined" label="Correo Electronico" inputProps={{ readOnly: true }} name="email"  value={email} fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <Controller as={TextField} className={classes.formControl} defaultValue="" variant="outlined" size="small" label="Nombre" name="name" 
            control={control} error={Boolean(errors.name)} fullWidth/>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Controller as={TextField} className={classes.formControl} variant="outlined" defaultValue="" size="small" label="Primer Apellido" name="surname" error={Boolean(errors.surname)}
              control={control} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller as={TextField} className={classes.formControl} variant="outlined" size="small" defaultValue="" label="Segundo Apellido" name="lastname" error={Boolean(errors.lastname)}
              control={control} fullWidth />
          </Grid>
          <Grid item xs={12} hidden={!formState.isDirty && newRegistry}>
            <Button color="primary" className={classes.button} disabled={isBusy} variant="text" type="submit" fullWidth>
              Guardar 
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
