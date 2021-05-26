import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { JobOpening } from '../../../components/detail/company/jobOpening/JobOpening'
import { JobOpeningsWidget } from '../../../components/detail/company/jobOpening/JobOpeningsWidget'
import { actions } from '../../../redux/company'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    padding: theme.spacing(6),
  },
  gridContainer: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  gridItem: {
    flexGrow: 1,
  },
}))

export const JobOpeningsView = () => {
  const dispatch = useDispatch()
  const jobOpenings = useSelector(state => state.company.jobOpenings, shallowEqual)
  const classes = useStyles()
  const [jobOpen, setJobOpen] = useState(undefined)
  const onView = jobId => {
    const job = jobOpenings.find(j => j.id === jobId)
    setJobOpen(job)
  }

  const onRemove = jobId => {
    dispatch(actions.removeJobOpening(jobId))
  }

  const widgetProps = { jobOpenings, view: onView, remove: onRemove }

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xl={4} lg={4} md={6} xs={12}>
        <JobOpeningsWidget {...widgetProps} />
      </Grid>
      <Grid item xl={5} lg={8} md={6} xs={12}>
        <Grid item className={classes.gridItem}>
          <JobOpening {...jobOpen} />
        </Grid>
      </Grid>
    </Grid>
  )
}
