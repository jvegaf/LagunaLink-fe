import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JobOpening } from '../../../components/detail/company/jobOpening/JobOpening'
import { JobOpeningsWidget } from '../../../components/detail/company/jobOpening/JobOpeningsWidget'
import { actions } from '../../../redux/company'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    padding: theme.spacing(6),
  },
  gridItem: {
    flexGrow: 1,
  },
}))

export const JobOpeningsView = () => {
  const dispatch = useDispatch()
  const jobOpenings = useSelector(state => state.company.jobOpenings)
  const classes = useStyles()
  const [jobOpen, setJobOpen] = useState(undefined)
  const onView = jobId => {
    const job = jobOpenings.find(j => j.id === jobId)
    setJobOpen({...job, readOnly: true})
  }

  useEffect(() => {
    if(jobOpenings !== undefined){ 
      const jb = jobOpenings[0]
      setJobOpen({...jb, readOnly: true})
    }
  }, [jobOpenings])

  const onRemove = jobId => {
    dispatch(actions.removeJobOpening(jobId))
  }

  const widgetProps = { jobOpenings, view: onView, remove: onRemove }

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item lg={5} md={6} sm={12}>
        <JobOpeningsWidget {...widgetProps} />
      </Grid>
      <Grid item lg={7} md={6} sm={12}>
        <Grid item className={classes.gridItem}>
          {jobOpen !== undefined && <JobOpening {...jobOpen} />}
        </Grid>
      </Grid>
    </Grid>
  )
}
