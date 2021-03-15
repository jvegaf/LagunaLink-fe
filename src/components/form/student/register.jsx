import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid, makeStyles } from '@material-ui/core'

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  surname: yup.string('Enter your surname').required('Surname is required'),
  lastname: yup.string('Enter your lastname').required('lastname is required'),
  email: yup.string('Enter your email').required('Email is required'),
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

const RegisterForm = props => {
  const classes = useStyles()

  const { values, handleChange, handleSubmit, touched, errors, dirty } = props

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              className={classes.formControl}
              id="email"
              name="email"
              label="Correo Electronico"
              value={values.email}
              size="small"
              inputProps={{ readOnly: true }}
              variant="outlined"
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              className={classes.formControl}
              id="name"
              name="name"
              label="Nombre"
              value={values.name}
              size="small"
              variant="outlined"
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="surname"
              name="surname"
              label="Primer Apellido"
              size="small"
              value={values.surname}
              className={classes.formControl}
              variant="outlined"
              onChange={handleChange}
              error={touched.surname && Boolean(errors.surname)}
              helperText={touched.surname && errors.surname}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="lastname"
              name="lastname"
              label="Segundo Apellido"
              size="small"
              value={values.lastname}
              variant="outlined"
              className={classes.formControl}
              onChange={handleChange}
              error={touched.lastname && Boolean(errors.lastname)}
              helperText={touched.lastname && errors.lastname}
            />
          </Grid>
          <Grid item xs={12} hidden={!dirty} className={classes.center}>
            <Button color="primary" className={classes.button} variant="contained" type="submit">
              Guardar 
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    email: props.email || '',
    name: props.name || '',
    surname: props.surname || '',
    lastname: props.lastname || '',
  }),
  validationSchema: validationSchema,
  handleSubmit: values => {
    alert(JSON.stringify(values, null, 2))
  },
})(RegisterForm)
