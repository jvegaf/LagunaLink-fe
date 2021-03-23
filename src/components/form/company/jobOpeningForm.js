import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/company'

const schema = yup.object().shape({
  position: yup.string().required(),
  description: yup.string().required(),
  responsibilities: yup.string().required(),
  conditions: yup.string().required(),
  qualification: yup.string().required(),
  prevExperience: yup.string().required(),
})

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  }
}))

export const JobOpeningForm = props => {
  const hide = props.hide
  const classes = useStyles()
  const { control, handleSubmit, errors, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if(!props.newJob) {
      setValue('position', props.position)
      setValue('description', props.description)
      setValue('responsibilities', props.responsibilities)
      setValue('conditions', props.conditions)
      setValue('qualification', props.qualification)
      setValue('prevExperience', props.prevExperience)
    }
  }, [props])


  const onSubmit = data => {
    dispatch(actions.addJobOpening(data))
    reset()
    hide()
  }

  
  return (
  <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
      <Grid item xs={12} hidden={!props.newJob}>
        <Controller
          as={TextField}
          defaultValue=""
          variant="outlined"
          size="small"
          label="Posicion"
          name="position"
          control={control}
          error={Boolean(errors.position)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          as={TextField}
          defaultValue=""
          variant="outlined"
          size="small"
          multiline
          rows={4}
          rowsMax={4}
          label="Descripcion"
          name="description"
          control={control}
          error={Boolean(errors.description)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          as={TextField}
          variant="outlined"
          defaultValue=""
          size="small"
          label="Responsabilidades"
          name="responsibilities"
          multiline
          rows={4}
          rowsMax={4}
          error={Boolean(errors.responsibilities)}
          control={control}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          as={TextField}
          defaultValue=""
          variant="outlined"
          size="small"
          multiline
          rows={4}
          rowsMax={4}
          label="Condiciones"
          name="conditions"
          control={control}
          error={Boolean(errors.conditions)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          as={TextField}
          defaultValue=""
          variant="outlined"
          size="small"
          label="Titulacion requerida"
          name="qualification"
          control={control}
          error={Boolean(errors.qualification)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          as={TextField}
          defaultValue=""
          variant="outlined"
          size="small"
          label="Experiencia requerida"
          name="prevExperience"
          control={control}
          error={Boolean(errors.prevExperience)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} container hidden={!props.newJob} justify={'space-around'}>
        <Button color="primary" variant="text" onClick={props.hide}>
          Cancelar
        </Button>
        <Button color="primary" variant="text" type="submit">
          Guardar
        </Button>
      </Grid>
    </Grid>
  </form>
)
}