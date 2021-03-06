import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
  },
}))

export const PasswordInput = () => {
  const { register } = useFormContext()
  const classes = useStyles()
  return (
    <TextField
      id="password"
      className={classes.formControl}
      inputRef={register}
      label="Contraseña"
      name="password"
      type="password"
    />
  )
}
