/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Divider, Grid, List, ListItem, Paper, Typography } from '@material-ui/core'
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

export const EnrollsListView = job => {
  const { enrolls } = job
  const history = useHistory()
  const classes = useStyles()

  // const handleClick = job => history.push(`/app/detail/job_opening/${job.id}`)

  return (
    <Grid container className={classes.root}>
      <Grid item lg={6}>
        <Paper>
          <Typography variant="h3">
            {job.position}
          </Typography>
          <List>
            {enrolls &&
              enrolls.map(enroll => (
                <div key={uuid()}>
                  <ListItem button onClick={() => handleClick(enroll)}>
                    <EnrollListItem {...enroll} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}
