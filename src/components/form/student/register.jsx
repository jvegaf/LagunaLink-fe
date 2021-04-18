import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
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
  const history = useHistory();
  const classes = useStyles()
  const registered = useSelector(state => state.student.registered)
  const { control, handleSubmit, setValue, errors, formState, reset } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()


  useEffect(() => {
    if(registered === true) {
      history.push('/app/dashboard')
    }
  }, [registered])
  
  useEffect(() => {
    if (!props.newRegistry) {
      setValue('email', props.email)
      setValue('name', props.name)
      setValue('surname', props.surname)
      setValue('lastname', props.lastname)
    }
  }, [props])

  const onSubmit = data => {
    if (props.newRegistry){
      dispatch(actions.registerStudent(data))
    }
    // const action = props.newRegistry === true ? actions.registerStudent() : actions.updateStudent() 
    reset()
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item hidden={props.newRegistry} xs={12}>
            <TextField className={classes.formControl} size="small" variant="outlined" label="Correo Electronico" inputProps={{ readOnly: true }} name="email"  value={props.email} fullWidth/>
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
          <Grid item xs={12} hidden={!formState.isDirty && !props.newRegistry}>
            <Button color="primary" className={classes.button} disabled={props.isBusy} variant="text" type="submit" fullWidth>
              Guardar 
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
