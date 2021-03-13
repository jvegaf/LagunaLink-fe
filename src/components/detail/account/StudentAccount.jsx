import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { RegisterForm } from '../../form/student/register'
import Card from '../../shared/Card'

export const StudentAccount = ({name, surname, lastname, email}) => {

  return (
    <Card title="Perfil">
      <Grid container spacing={3}>
        <TextField inputProps={{readOnly: true}} value={email} label="Correo Electronico" fullWidth />
        <RegisterForm  prefname={name} prefsurname={surname} preflastname={lastname} />
      </Grid>
    </Card>
  )
}
