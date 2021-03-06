import React from 'react'
import { useFormContext } from 'react-hook-form'
import { makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
  },
}))

export const TextInput = ({ name, label }) => {
  const { register } = useFormContext()
  const classes = useStyles()
  return (
    <TextField
      fullWidth
      className={classes.formControl}
      id={name}
      inputRef={register}
      label={label}
      name={name}
      type="text"
    />
  )
}
