import React from 'react'
import '../__shared__/styles.css'
import { Box, Grid } from '@material-ui/core'
import { SignInComponent } from '../../components/SignIn/Signin'

export const SignInPage = () => {
  return (
    <Grid container spacing={0}>
      <Grid item md={7}>
        <Box className='handshake-bg' />
      </Grid>
      <Grid item md={5} xs={12} justify={'center'} alignItems={'center'} container>
        <Grid item md={6} xs={12}>
          <SignInComponent />
        </Grid>
      </Grid>
    </Grid>
  )
}
