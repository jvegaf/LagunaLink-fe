import { Checkbox, FormControlLabel } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const RememberMeCB = () => {
  const { register } = useFormContext()

  return (
    <FormControlLabel
      control={<Checkbox inputRef={register} name="rememberMe" id="rememberMe" color="primary" />}
      label="Recuerdame"
      labelPlacement="start"
    />
  )
}
