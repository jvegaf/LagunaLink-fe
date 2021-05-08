import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JobOpening } from '../../../components/detail/company/JobOpening'
import { JobOpeningsWidget } from '../../../components/detail/company/JobOpeningsWidget'
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
    justifyContent: 'center'
  },
  gridItem: {
    flexGrow: 1,
  },
}))

export const JobOpeningsView = () => {
  const dispatch = useDispatch()
  const ownJobOpenings = useSelector(state => state.company.ownJobOpenings)
  const classes = useStyles()
  const [jobOpen, setJobOpen] = useState(undefined)
  const onView = jobId => {
    const job = ownJobOpenings.find(j => j.id === jobId)
    setJobOpen(job)
  }

  const onRemove = jobId => {
    dispatch(actions.removeJobOpening(jobId))
  }

  const widgetProps = { jobs: ownJobOpenings, view: onView, remove: onRemove }

  useEffect(() => {
    if (ownJobOpenings) {
      const job = ownJobOpenings[0]
      const jobProps = { ...job, readOnly: true }
      setJobOpen(jobProps)
    }
  }, [ownJobOpenings])

  return (
    <Grid container className={classes.gridContainer} spacing={3}>
      <Grid item xl={6} lg={4} md={6} xs={12}>
        <JobOpeningsWidget {...widgetProps} />
      </Grid>
      <Grid item xl={6} lg={8} md={6} xs={12}>
        <Grid item className={classes.gridItem}>
          {ownJobOpenings && <JobOpening {...jobOpen} />}
        </Grid>
      </Grid>
    </Grid>
  )
}
