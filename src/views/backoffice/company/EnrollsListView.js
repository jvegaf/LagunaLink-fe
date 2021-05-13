import { Grid, List, ListItem, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { JobListItem } from '../../../components/jobOpening/jobListItem'
import { shallowEqual, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { EnrollListItem } from '../../../components/detail/company/enrollment/EnrollListItem'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    width: '100%',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(4),
  },
  gridItem: {
    flexGrow: 1,
  },
}))

export const DashboardListView = () => {
  const history = useHistory()
  const classes = useStyles()
  const companiesFetched = useSelector(state => state.shared.companiesFetched)
  const jobsOpenFetched = useSelector(state => state.shared.jobsFetched)
  const companies = useSelector(state => state.shared.companies)
  const jobOpenings = useSelector(state => state.shared.jobOpenings, shallowEqual)
  let jobs;
  if (companiesFetched && jobsOpenFetched){
    jobs = jobOpenings.filter(job => moment(job.hiringDate) > moment()).map(job => {
      const comp = companies.find(comp => comp.id === job.company)
      return {...job, company: comp.name, thumbnail: comp.avatar}
    })
  }

  const handleClick = job => history.push(`/app/detail/job_opening/${job.id}`)

  return (
    <Grid container className={classes.root}>
      <Grid item lg={6}>
        <Paper>
          <List>
            {enrolls && enrolls.map(enroll => (
            <ListItem key={uuid()} button onClick={() => handleClick(enroll)}>
              <EnrollListItem {...enroll}/>
            </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}
