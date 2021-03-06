import React from 'react'
import { useStudent } from '../../../hooks/useStudent'
import { Language } from './Language'
import { Grid } from '@material-ui/core'
import { MDBBtn } from 'mdbreact'


export const Languages = () => {
  const {languages} = useStudent()

  return (
    <Grid container md={8} spacing={3} justify={'center'}>
      {languages.map((language, index) =>
        <Grid item key={index}>
          <Language name={language.name} speak={language.speak} write={language.write}/>
        </Grid>)}
        <Grid item container justify={'center'} alignContent={'center'} >
          <MDBBtn type={'button'}>Agregar Idioma</MDBBtn>
        </Grid>
    </Grid>
  )
}
