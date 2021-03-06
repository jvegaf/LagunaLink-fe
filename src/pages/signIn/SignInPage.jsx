import React from 'react'
import '../__shared__/styles.css'
import { Box, Grid } from '@material-ui/core'
import { SignInComponent } from '../../components/sign/Signin'

export const SignInPage = () => {
  return (
    <Grid container alignItems={'center'} justify={'center'} spacing={0}>
      <Grid item md={7}>
        <Box className='handshake-bg' />
      </Grid>
      <Grid item md={5} sm={6} xs={12} container justify={'center'} alignItems={'center'}>
        <Grid item md={6} sm={8} xs={12}>
          <SignInComponent />
        </Grid>
      </Grid>
    </Grid>
  )
}
