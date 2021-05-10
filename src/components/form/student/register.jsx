import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/student'

const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  lastname: yup.string().required(),
})

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}))

export const StudentForm = props => {
  const classes = useStyles()
  const { newRegistry, email, name, surname, lastname } = props
  const {
    control,
    handleSubmit,
    setValue,
    errors,
    formState: { isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const isBusy = useSelector(state => state.student.isBusy, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    setValue('email', email)
    setValue('name', name)
    setValue('surname', surname)
    setValue('lastname', lastname)
  }, [email, name, surname, lastname])

  const handleReset = () => {
    reset(
      {
        name: name,
        surname: surname,
        lastname: lastname,
      },
      {
        keepDirty: false,
        keepTouched: false,
      }
    )
  }

  const onSubmit = data => {
    if (newRegistry) {
      dispatch(actions.registerStudent(data))
      return
    }
    dispatch(actions.updateStudent(data))
    reset({
      keepTouched: false,
      keepDirty: false,
    })
  }

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {!newRegistry && (
            <Grid item xs={12}>
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
          )}
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

          <Grid item xs={12} md={6}>
            <Controller
              as={TextField}
              className={classes.formControl}
              variant="outlined"
              defaultValue=""
              size="small"
              label="Primer Apellido"
              name="surname"
              error={Boolean(errors.surname)}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              as={TextField}
              className={classes.formControl}
              variant="outlined"
              size="small"
              defaultValue=""
              label="Segundo Apellido"
              name="lastname"
              error={Boolean(errors.lastname)}
              control={control}
              fullWidth
            />
          </Grid>
          {isDirty && (
            <Grid item xs={12} className={classes.container}>
              <Button color="primary" disabled={isBusy} variant="text" onClick={handleReset}>
                Cancelar
              </Button>
              <Button color="primary" disabled={isBusy} variant="text" type="submit">
                Guardar
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  )
}
