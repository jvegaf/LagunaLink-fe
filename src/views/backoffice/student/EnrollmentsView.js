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
  const user = useSelector(state => state.user)
  const enrolls = useSelector(state => state.student.enrolls, shallowEqual)

  
  
  const actionRemove = itemId => {
    dispatch(actions.unenrollThisJob(itemId))
  }
  
  const actionView = itemId => {
    const enroll = enrolls.find(enr => enr.id === itemId)
    history.push(`/app/detail/job_opening/${enroll.job_opening}`)
  }


  const props = { enrolls, remove: actionRemove, view: actionView }

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile {...user} />
        </Grid>
        <Grid item container direction="column" spacing={3} xl={6} lg={8} md={6} xs={12}>
          <Grid item className={classes.gridItem}>
            {enrolls &&  <EnrollmentsWidget {...props} /> }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
