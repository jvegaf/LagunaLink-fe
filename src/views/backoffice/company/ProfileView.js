import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Profile } from '../../../components/detail/account/Profile'
import { CompanyAccount } from '../../../components/detail/company/CompanyAccount'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
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
  const company = useSelector(state => state.company, shallowEqual)
  const classes = useStyles()
  const props = { ...company, email: user.email }

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xl={3} lg={4} md={6} xs={12}>
        <Profile {...user} />
      </Grid>
      <Grid item container direction="column" xl={6} lg={8} md={6} xs={12}>
        <Grid item className={classes.gridItem}>
          <CompanyAccount {...props} />
        </Grid>
      </Grid>
    </Grid>
  )
}
