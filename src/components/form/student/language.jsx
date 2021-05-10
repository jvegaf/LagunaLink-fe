import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'
import { Rating } from '@material-ui/lab'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/student'

const schema = yup.object().shape({
  name: yup.string().required(),
})

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(3),
  },
  button: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  successBtn: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    backgroundColor: green.A700,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: green.A400
    }
  }
}))

export const LanguageForm = props => {
  const { hide } = props
  const classes = useStyles()
  const student = useSelector(state => state.student)
  const { control, handleSubmit, errors, formState, reset } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()

  const onSubmit = data => {
    const langs = student.languages
    langs.push(data)
    dispatch(actions.updateStudent({ languages: langs }))
    reset()
    hide()
  }

  const onCancel = () => hide()

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              className={classes.formControl}
              defaultValue=""
              variant="outlined"
              size="small"
              label="Idioma"
              name="name"
              control={control}
              error={Boolean(errors.name)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Nivel Oral</Typography>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Rating onChange={value => onChange(value)} value={value} onBlur={onBlur} />
                )}
                name="speak"
                rules={{ required: true }}
                defaultValue={0}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Nivel Escrito</Typography>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Rating onChange={value => onChange(value)} value={value} onBlur={onBlur} />
                )}
                name="write"
                rules={{ required: true }}
                defaultValue={0}
              />
            </Box>
          </Grid>

          <Grid item xs={12} className={classes.center}>
            <Button
              disabled={!formState.isDirty}
              className={classes.successBtn}
              variant="contained"
              type="submit"
            >
              Guardar
            </Button>
            <Button
              color="primary"
              className={classes.button}
              variant="contained"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
