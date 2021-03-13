// @ts-nocheck
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { SignInComponent } from '../../components/sign/Signin'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}))

export const SignInView = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} justify={'center'} >
      <Grid item container alignItems={'center'} lg={2} md={4} sm={6} xs={12}>
        <SignInComponent />
      </Grid>
    </Grid>
  )
}
