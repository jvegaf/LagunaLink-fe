/* eslint-disable no-unused-vars */
// @ts-nocheck
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import Profile from '../../components/detail/account/Profile'
import { StudentAccount } from '../../components/detail/account/StudentAccount'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}))

export const ProfileView = () => {
  const user = useSelector(state => state.user)
  const student = useSelector(state => state.student)
  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile name={user.prefName} role={'Estudiante'} />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          {student && (<StudentAccount {...student} />)}
        </Grid>
      </Grid>
    </Container>
  )
}
