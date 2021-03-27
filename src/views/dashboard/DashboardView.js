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
    paddingRight: theme.spacing(4)
  },
  gridItem: {
    flexGrow: 1
  }
}))

export const DashboardView = () => {
  const classes = useStyles()
  const jobOpenings = useSelector(state => state.shared.jobOpenings)
  const jobs = jobOpenings
  

  return (
      <Grid container className={classes.gridContainer} spacing={9}>
        {jobs.map((job) =>(
        <Grid item lg={4} xs={12} key={uuid()}>
          <JobCard {...job} />
        </Grid> 
        ))}
      </Grid>
  )
}
