import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { JobCard } from '../../components/jobOpening/jobCard'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    padding: theme.spacing(6),
  },
  gridContainer: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(4),
  },
  gridItem: {
    flexGrow: 1,
  },
}))

export const DashboardView = () => {
  const classes = useStyles()
  const companiesFetched = useSelector(state => state.shared.companiesFetched)
  const jobsOpenFetched = useSelector(state => state.shared.jobsFetched)
  const companies = useSelector(state => state.shared.companies)
  const jobOpenings = useSelector(state => state.shared.jobOpenings)
  let jobs;
  if (companiesFetched && jobsOpenFetched){
    jobs = jobOpenings.map(job => {
      const comp = companies.find(comp => comp.id === job.company)
      return {...job, company: comp.name, thumbnail: comp.avatar}
    })
  }

  return (
    <Grid container className={classes.gridContainer} spacing={9}>
      {jobs && jobs.map(job => (
        <Grid item lg={4} xs={12} key={uuid()}>
          <JobCard {...job} />
        </Grid>
      ))}
    </Grid>
  )
}
