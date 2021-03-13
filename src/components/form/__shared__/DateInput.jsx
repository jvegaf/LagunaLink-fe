import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField } from '@material-ui/core'

export const DateInput = ({ componentName, label }) => {
  const { register, watch, setValue } = useFormContext()
  const value = watch(componentName).substr(0, 7)

  useEffect(() => {
    register({ name: componentName })
  }, [register])

  const handleChange = e => setValue(componentName, e.target.value)

  return <TextField
    fullWidth
    id={componentName}
    onChange={handleChange}
    value={value}
    label={label}
    name={componentName} type="month" />
}
