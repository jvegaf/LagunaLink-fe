import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

const validationSchema = yup.object({
  name: yup.string().required('Language name is required'),
})

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
  },
  button: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}))

const LanguageForm = props => {
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
              id="name"
              name="name"
              label="Idioma"
              value={values.name}
              size="small"
              variant="outlined"
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Nivel Oral</Typography>
              <Rating
                name="speak"
                value={values.speak}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Nivel Escrito</Typography>
              <Rating
                name="write"
                value={values.write}
                onChange={handleChange}
              />
            </Box>
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
    name: props.name || '',
    speak: props.speak || 0,
    write: props.write || 0,
  }),
  validationSchema: validationSchema,
  handleSubmit: values => {
    alert(JSON.stringify(values, null, 2))
  },
})(LanguageForm)
