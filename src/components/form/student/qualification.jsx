import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid, makeStyles } from '@material-ui/core'

const validationSchema = yup.object({
  title: yup.string('Enter your Qualification').required('Qualification is required')
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

const QualificationForm = props => {
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
              id="title"
              name="title"
              label="Titulacion"
              value={values.title}
              size="small"
              variant="outlined"
              onChange={handleChange}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="start_date"
              type="month"
              name="start_date"
              label="Comienzo"
              size="small"
              value={values.start_date}
              className={classes.formControl}
              variant="outlined"
              onChange={handleChange}
              error={touched.start_date && Boolean(errors.start_date)}
              helperText={touched.start_date && errors.start_date}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="end_date"
              name="end_date"
              label="Terminacion"
              type="month"
              size="small"
              value={values.end_date}
              variant="outlined"
              className={classes.formControl}
              onChange={handleChange}
              error={touched.end_date && Boolean(errors.end_date)}
              helperText={touched.end_date && errors.end_date}
            />
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Button color="primary" hidden={!dirty} className={classes.button} variant="contained" type="submit">
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
    title: props.title || '',
    start_date: (props.start_date).substr(0,7) || '',
    end_date: (props.end_date).substr(0,7) || '',
  }),
  validationSchema: validationSchema,
  handleSubmit: values => {
    alert(JSON.stringify(values, null, 2))
  },
})(QualificationForm)
