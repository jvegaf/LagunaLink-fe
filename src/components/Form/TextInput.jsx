import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    width: '90%',
  },
}))

export const TextInput = ({name, label}) => {
  const classes = useStyles()
  const { register } = useFormContext()

  return (
    <TextField
      className={classes.formControl}
      id={name}
      inputRef={register}
      label={label}
      name={name}
      type="text"
    />
  )
}
