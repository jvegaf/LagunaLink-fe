/* eslint-disable no-unused-vars */
// @ts-nocheck
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { StudentRegister } from '../../components/register/student/StudentRegister'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}))

export const StudentRegisterView = () => {
  const history = useHistory();
  const classes = useStyles()
  const registered = useSelector(state => state.student.registered, shallowEqual)
  useEffect(() => {
    if (registered === true){
      history.push('/app/dashboard')
    }
  }, [registered])

  return (
    <Grid container className={classes.root} justify={'center'} >
      <Grid item container alignContent={'center'} lg={5} md={6} sm={8} xs={12}>
        <StudentRegister />
      </Grid>
    </Grid>
  )
}
