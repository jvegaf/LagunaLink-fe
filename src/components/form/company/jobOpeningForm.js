/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/company'

const today = moment()

const schema = yup.object().shape({
  position: yup.string().required(),
  description: yup.string().required(),
  responsibilities: yup.string().required(),
  conditions: yup.string().required(),
  qualification: yup.string().required(),
  prevExperience: yup.string().required(),
  hiringDate: yup.date().min(today),
})

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding : theme.spacing(4)
  },
  errorMessage: {
    color: 'red',
  },
}))

export const JobOpeningForm = props => {
  const {
    handleClose,
    position,
    _id,
    description,
    responsibilities,
    conditions,
    qualification,
    prevExperience,
    hiringDate,
    isActive,
    isNew
  } = props
  const classes = useStyles()
  const {
    control,
    handleSubmit,
    errors,
    reset,
    setValue,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useDispatch()

  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    reset({
      description,
      responsibilities,
      conditions,
      qualification,
      prevExperience,
      hiringDate
    })
  }, [_id])

  useEffect(() => {
    setShowActions(formState.isDirty)
  }, [formState.isDirty])

  useEffect(() => {
    setShowActions(isNew)
  }, [isNew])

  const close = () => {
    handleClose === undefined ? reset() : handleClose()
  }

  const onSubmit = data => {
    data.hiringDate = data.hiringDate.toISOString().substr(0, 10)
    if (!isActive) {
      dispatch(actions.addJobOpening(data))
      reset()
      handleClose()
      return
    }
    data.id = _id
    data.isActive = isActive
    dispatch(actions.updateJobOpening(data))
    reset()
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {!isActive && (
          <Grid item xs={12}>
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
        )}
        <Grid item xs={12}>
          <Controller
            as={TextField}
            variant="outlined"
            defaultValue=""
            size="small"
            multiline
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
            size="small"
            defaultValue=""
            label="Responsabilidades"
            name="responsibilities"
            multiline
            error={Boolean(errors.responsibilities)}
            control={control}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            variant="outlined"
            size="small"
            multiline
            defaultValue=""
            label="Condiciones"
            name="conditions"
            control={control}
            error={Boolean(errors.conditions)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            variant="outlined"
            size="small"
            defaultValue=""
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
            type="date"
            defaultValue=""
            variant="standard"
            size="small"
            helperText="Fecha prevista de contratación"
            name="hiringDate"
            control={control}
            error={Boolean(errors.hiringDate)}
            fullWidth
          />
          {errors?.hiringDate && <p className={classes.errorMessage}>La fecha debe ser posterior a hoy</p>}
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={TextField}
            variant="outlined"
            defaultValue=""
            size="small"
            label="Experiencia requerida"
            name="prevExperience"
            control={control}
            error={Boolean(errors.prevExperience)}
            fullWidth
          />
        </Grid>
        {showActions && (
          <Grid item xs={12} container justify={'space-around'}>
            <Button color="primary" variant="text" onClick={() => close()}>
              Cancelar
            </Button>
            <Button color="primary" variant="text" type="submit">
              Guardar
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  )
}
