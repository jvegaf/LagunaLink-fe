import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { JobOpening } from '../../../components/detail/company/jobOpening/JobOpening'
import { JobOpeningsWidget } from '../../../components/detail/company/jobOpening/JobOpeningsWidget'
import { actions } from '../../../redux/company'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(6),
  },
  gridItem: {
    width: '100%'
  },
}))

export const JobOpeningsView = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const jobOpenings = useSelector(state => state.company.jobOpenings)
  const classes = useStyles()
  const [jobOpen, setJobOpen] = useState(null)
  const [jobIndex, setJobIndex] = useState(null)
  const onView = index => {
    setJobIndex(index)
    const job = jobOpenings[index]
    setJobOpen({...job, isNew: false})
  }

  useEffect(() => {
    if (Array.isArray(jobOpenings)) {
      setJobIndex(0)
    }
  }, [jobOpenings])

  useEffect(() => {
    if(jobIndex !== null){
      const jb = jobOpenings[jobIndex]
      setJobOpen(jb)
    }
  }, [jobIndex])

  const onRemove = jobId => {
    dispatch(actions.removeJobOpening(jobId))
  }

  const onEnrolls = job => {
    if (job.enrolls.length < 1) { return }
    history.push('/app/job_opening/enrollments', job)
  }

  const widgetProps = { jobOpenings, onView, onRemove, onEnrolls }

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item lg={5} md={12} sm={12} xs={12}>
        <JobOpeningsWidget {...widgetProps} />
      </Grid>
      <Grid item lg={7} md={12}>
        <Grid item className={classes.gridItem}>
          <JobOpening {...jobOpen} />
        </Grid>
      </Grid>
    </Grid>
  )
}
