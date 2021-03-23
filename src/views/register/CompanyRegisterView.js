/* eslint-disable no-unused-vars */
// @ts-nocheck
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { SignUp } from '../../components/sign/SignUp'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { CompanyRegister } from '../../components/register/company/CompanyRegister'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}))

export const CompanyRegisterView = () => {
  const classes = useStyles()
  const needCompanyRegister = useSelector(state => state.user.needCompanyRegister)

  // if(!needCompanyRegister) return <Redirect to="/"/>

  return (
    <Grid container className={classes.root} justify={'center'} >
      <Grid item container alignContent={'center'} lg={5} md={6} sm={8} xs={12}>
        <CompanyRegister />
      </Grid>
    </Grid>
  )
}
