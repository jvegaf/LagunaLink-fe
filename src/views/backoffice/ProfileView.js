/* eslint-disable no-unused-vars */
// @ts-nocheck
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import Profile from '../../components/detail/account/Profile'
import Languages from '../../components/detail/student/curriculum/Languages'
import { Qualification } from '../../components/detail/student/curriculum/Qualification'
import { StudentAccount } from '../../components/detail/student/StudentAccount'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    padding: theme.spacing(6),
  },
}))

export const ProfileView = () => {
  const user = useSelector(state => state.user)
  const student = useSelector(state => state.student)
  const qualification = useSelector(state => state.student.qualification)
  const languages = useSelector(state => state.student.languages)
  const classes = useStyles()

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item>
        <Profile name={user.prefName} role={'Estudiante'} />
      </Grid>
      <Grid item>
        <StudentAccount {...student} />
      </Grid>
      <Grid item>
        <Qualification {...qualification} />
      </Grid>
      <Grid item>
        <Languages languages={languages}/>
      </Grid>
    </Grid>
  )
}
