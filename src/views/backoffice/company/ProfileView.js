import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { Profile } from '../../../components/detail/account/Profile'
import { CompanyAccount } from '../../../components/detail/company/CompanyAccount'
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

export const CompanyProfileView = () => {
  const user = useSelector(state => state.user)
  const company = useSelector(state => state.company)
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile {...user} />
        </Grid>
        <Grid item container direction="column" spacing={3} xl={6} lg={8} md={6} xs={12}>
          <Grid item className={classes.gridItem}>
            <CompanyAccount company={company} email={user.email} />
          </Grid>
          <Grid item className={classes.gridItem}>
            <JobOpeningsWidget {...company} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
