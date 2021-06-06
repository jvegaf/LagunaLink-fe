import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
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
  const avatars = useSelector(state => state.shared.avatars)
  const user = useSelector(state => state.user)
  const enrolls = useSelector(state => state.student.enrolls, shallowEqual)

  const onRemove = enrollId => {
    dispatch(actions.unenrollThisJob(enrollId))
  }

  const onView = job => {
    job.companyDetail.avatar = avatars.find(av => av.id === job.companyDetail._id).url
    history.push({ pathname: `/app/detail/job_opening`, state: { job } })
  }

  const props = { enrolls, onView, onRemove }

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile {...user} />
        </Grid>
        <Grid item container direction="column" spacing={3} lg={8} md={6} xs={12}>
          <Grid item className={classes.gridItem}>
            <EnrollmentsWidget {...props} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
