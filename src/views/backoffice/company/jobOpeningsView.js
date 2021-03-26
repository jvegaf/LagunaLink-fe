import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { JobOpening } from '../../../components/detail/company/JobOpening'
import { JobOpeningsWidget } from '../../../components/detail/company/JobOpeningsWidget'

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

export const JobOpeningsView = () => {
  const company = useSelector(state => state.company)
  const classes = useStyles()
  const jobs = company.own_job_openings
  const [jobIndex, setJobIndex] = useState(0)
  const jobOpen = jobs !== undefined ? jobs[jobIndex] : undefined
  const handleChange = idx => setJobIndex(idx)
  const widgetProps = {...company, idx: jobIndex, changeIdx: handleChange}

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <JobOpeningsWidget {...widgetProps} />
        </Grid>
        <Grid item container direction="column" spacing={3} xl={6} lg={8} md={6} xs={12}>
          <Grid item className={classes.gridItem}>
            {jobOpen === undefined ? (<span>No tienes ofertas creadas</span>) : (<JobOpening {...jobOpen} />)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
