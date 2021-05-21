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
  const roleValue = watch('userRole')

  useEffect(() => {
    register({ name: 'userRole' })
  }, [register])

  const handleChange = e => setValue('userRole', e.target.value)

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="userRole">Tipo de Cuenta</InputLabel>
      <Select
        labelId="userRole"
        name="userRole"
        value={roleValue}
        onChange={handleChange}
      >
        <MenuItem value={'ROLE_STUDENT'}>Estudiante</MenuItem>
        <MenuItem value={'ROLE_COMPANY'}>Empresa</MenuItem>
      </Select>
    </FormControl>
  )
}
