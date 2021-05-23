/* eslint-disable no-unused-vars */
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Profile } from '../../../components/detail/account/Profile'
import { EnrollmentsWidget } from '../../../components/detail/student/enrolls/EnrollmentsWidget'
import { actions } from '../../../redux/student'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    padding: theme.spacing(6),
  },
  gridContainer: {
    paddingTop: theme.spacing(3),
  },
  gridItem: {
    flexGrow: 1,
  },
}))

export const EnrollmentsView = () => {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const jobOpenings = useSelector(state => state.shared.jobOpenings)
  const companies = useSelector(state => state.shared.companies)
  const enrollments = useSelector(state => state.student.enrollments)
  const [enrolls, setEnrolls] = useState(undefined)


  const actionRemove = itemId => {
    dispatch(actions.unenrollThisJob(itemId))
    const enrls = enrolls.filter(en => en.id !== itemId)
    setEnrolls(enrls)
  }
  
  const actionView = itemId => {
    const enroll = enrolls.find(enr => enr.id === itemId)
    history.push(`/app/detail/job_opening/${enroll.job_opening}`)
  }

  // const updateEnrolls = (enrollmnts, comps, jobs) => {
  //   return enrollmnts.map(en => {
  //     const job = jobOpenings.find(j => j.id === en.job_opening)
  //     const company = companies.find(comp => comp.id === job.company)
  //     en.jobPosition = job.position
  //     en.companyName = company.name
  //     return en
  //   })
  // }

  const props = { enrolls, remove: actionRemove, view: actionView }
  return (
    <Container maxWidth="lg">
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile {...user} />
        </Grid>
        <Grid item container direction="column" spacing={3} xl={6} lg={8} md={6} xs={12}>
          <Grid item className={classes.gridItem}>
            {enrollments &&  <EnrollmentsWidget {...props} /> }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
