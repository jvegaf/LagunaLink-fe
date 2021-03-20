/* eslint-disable no-unused-vars */
// @ts-nocheck
import { Container, Grid } from '@material-ui/core'
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
  gridContainer: {
    paddingTop: theme.spacing(3)
  },
  gridItem: {
    flexGrow: 1
  }
}))

export const ProfileView = () => {
  const user = useSelector(state => state.user)
  const student = useSelector(state => state.student)
  const qualification = useSelector(state => state.student.qualification)
  const languages = useSelector(state => state.student.languages)
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile {...user} />
        </Grid>
        <Grid item container direction="column" spacing={3} xl={6} lg={8} md={6} xs={12}>
          <Grid item className={classes.gridItem} >
            <StudentAccount student={student} email={user.email} />
          </Grid>
          <Grid item className={classes.gridItem}>
            <Qualification {...qualification} />
          </Grid>
          <Grid item className={classes.gridItem}>
            <Languages languages={languages} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
