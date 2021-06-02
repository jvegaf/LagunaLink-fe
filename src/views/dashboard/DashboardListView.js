import { Divider, Grid, List, ListItem, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { JobListItem } from '../../components/jobOpening/jobListItem'


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
  const companies = useSelector(state => state.shared.allCompanies)
  const avatars = useSelector(state => state.shared.avatars)
  const jobOpenings = useSelector(state => state.shared.allJobOpenings)
  let jobs;
  if (companiesFetched && jobsOpenFetched){
    jobs = jobOpenings.filter(job => moment(job.hiringDate) > moment())
    .filter(job => job.isActive)
    .map(job => {
      job.companyDetail = companies.find(comp => comp.id === job.company)
      job.companyDetail.avatar = avatars.find(av => av.id === job.company).url
      return job
    }).reverse()
  }

  const handleClick = job => history.push({pathname:'/app/detail/job_opening', state: { job }})

  return (
    <Grid container className={classes.root}>
      <Grid item lg={8} md={10} sm={12}>
        <Paper>
          <List>
            {jobs && jobs.map(job => (
            <div key={uuid()}>
              <ListItem button onClick={() => handleClick(job)}>
                <JobListItem {...job}/>
              </ListItem>
              <Divider variant="middle"/>
            </div>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}
