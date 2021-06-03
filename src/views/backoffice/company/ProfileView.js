import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Profile } from '../../../components/detail/account/Profile'
import { CompanyAccount } from '../../../components/detail/company/CompanyAccount'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: theme.spacing(4),
  }
}))

export const CompanyProfileView = () => {
  const user = useSelector(state => state.user)
  const company = useSelector(state => state.company, shallowEqual)
  const classes = useStyles()
  const props = { ...company, email: user.email }

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item lg={3} md={12}>
        <Profile {...user} />
      </Grid>
      <Grid item lg={7} md={12}>
        <CompanyAccount {...props} />
      </Grid>
    </Grid>
  )
}
