import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Profile } from '../../../components/detail/account/Profile'
import { LanguagesWidget } from '../../../components/detail/student/curriculum/Languages'
import { Qualification } from '../../../components/detail/student/curriculum/Qualification'
import JobExperiencesWidget from '../../../components/detail/student/jobExp/JobExperiencesWidget'
import { StudentAccount } from '../../../components/detail/student/StudentAccount'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(6),
  }
}))

export const StudentProfileView = () => {
  const email = useSelector(state => state.user.email)
  const user = useSelector(state => state.user)
  const student = useSelector(state => state.student, shallowEqual)
  const classes = useStyles()

  const props = { ...student, email, newRegistry: false }
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item lg={3} md={6} xs={12}>
        <Profile {...user} />
      </Grid>
      <Grid item container direction="column" spacing={5} lg={7} md={6} xs={12}>
        <Grid item className={classes.gridItem}>
          <StudentAccount {...props} />
        </Grid>
        <Grid item className={classes.gridItem}>
          <Qualification {...props} />
        </Grid>
        <Grid item className={classes.gridItem}>
          <LanguagesWidget {...props} />
        </Grid>
        <Grid item className={classes.gridItem}>
          <JobExperiencesWidget {...props} />
        </Grid>
      </Grid>
    </Grid>
  )
}
