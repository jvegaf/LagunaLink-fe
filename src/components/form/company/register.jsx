import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/company'

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
  region: yup.string().required(),
  city: yup.string().required(),
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


export const CompanyForm = props => {
  const classes = useStyles()
  const { control, handleSubmit, setValue, errors, formState, reset } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!props.newRegistry) {
      setValue('email', props.email)
      setValue('name', props.name)
      setValue('description', props.description)
      setValue('address', props.address)
      setValue('postalCode', props.postalCode)
      setValue('region', props.region)
      setValue('city', props.city)
    }
  }, [props])

  const onSubmit = data => {
    if (props.newRegistry) {
      dispatch(actions.registerCompany(data))
    }
    // const action = props.newRegistry === true ? actions.registerCompany() : actions.updateCompany() 
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
          <Grid item xs={12}>
            <Controller as={TextField} multiline className={classes.formControl} variant="outlined" defaultValue="" size="small" label="Descripcion" name="description" error={Boolean(errors.description)}
              control={control} fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <Controller as={TextField} className={classes.formControl} variant="outlined" defaultValue="" size="small" label="Direccion" name="address" error={Boolean(errors.address)}
              control={control} fullWidth/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller as={TextField} className={classes.formControl} variant="outlined" defaultValue="" size="small" label="Codigo Postal" name="postalCode" error={Boolean(errors.postalCode)}
              control={control} fullWidth/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller as={TextField} className={classes.formControl} variant="outlined" defaultValue="" size="small" label="Provincia" name="region" error={Boolean(errors.region)}
              control={control} fullWidth/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller as={TextField} className={classes.formControl} variant="outlined" defaultValue="" size="small" 
            label="Poblacion" name="city" error={Boolean(errors.city)} control={control} fullWidth/>
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
