import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useState } from 'react'
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
    paddingRight: theme.spacing(5),
  },
}))

export const CompanyForm = props => {
  const { email, name, description, address, postalCode, region, city, isBusy, newRegistry } = props
  const classes = useStyles()
  const [showActions, setShowActions] = useState(false)
  const { control, handleSubmit, setValue, errors, formState } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()

  useEffect(() => {
    setValue('email', email)
    setValue('name', name)
    setValue('description', description)
    setValue('address', address)
    setValue('postalCode', postalCode)
    setValue('region', region)
    setValue('city', city)
    setShowActions(false)
  }, [props])

  useEffect(() => {
    setShowActions(true)
  }, [formState.isDirty])

  useEffect(() => {
    setShowActions(false)
  }, [formState.isSubmitting])

  const onSubmit = data => {
    newRegistry ? dispatch(actions.registerCompany(data)) : dispatch(actions.updateCompany(data))
  }

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item hidden={newRegistry} xs={12}>
            <TextField
              className={classes.formControl}
              size="small"
              variant="outlined"
              label="Correo Electronico"
              inputProps={{ readOnly: true }}
              name="email"
              value={email}
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
              label="Nombre"
              name="name"
              control={control}
              error={Boolean(errors.name)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              multiline
              className={classes.formControl}
              variant="outlined"
              defaultValue=""
              size="small"
              label="Descripcion"
              name="description"
              error={Boolean(errors.description)}
              control={control}
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
              label="Direccion"
              name="address"
              error={Boolean(errors.address)}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              as={TextField}
              className={classes.formControl}
              variant="outlined"
              defaultValue=""
              size="small"
              label="Codigo Postal"
              name="postalCode"
              error={Boolean(errors.postalCode)}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              as={TextField}
              className={classes.formControl}
              variant="outlined"
              defaultValue=""
              size="small"
              label="Provincia"
              name="region"
              error={Boolean(errors.region)}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              as={TextField}
              className={classes.formControl}
              variant="outlined"
              defaultValue=""
              size="small"
              label="Poblacion"
              name="city"
              error={Boolean(errors.city)}
              control={control}
              fullWidth
            />
          </Grid>
          {showActions && (
            <Grid item xs={12}>
              <Button color="primary" className={classes.button} disabled={isBusy} variant="text" type="submit" fullWidth>
                Guardar
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  )
}
