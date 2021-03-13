import React, { useEffect } from 'react'
import { Select, MenuItem, makeStyles, FormControl, InputLabel } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    width: '90%',
  },
}))

export const RoleSelectInput = () => {
  const { register, watch, setValue } = useFormContext()
  const classes = useStyles()
  const roleValue = watch('role')

  useEffect(() => {
    register({ name: 'role' })
  }, [register])

  const handleChange = e => setValue('role', e.target.value)

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="role">Tipo de Cuenta</InputLabel>
      <Select
        labelId="role"
        name="role"
        value={roleValue}
        onChange={handleChange}
      >
        <MenuItem value={'ROLE_STUDENT'}>Estudiante</MenuItem>
        <MenuItem value={'ROLE_COMPANY'}>Empresa</MenuItem>
      </Select>
    </FormControl>
  )
}
