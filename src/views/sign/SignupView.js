// @ts-nocheck
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignUp } from '../../components/sign/SignUp'
import { actions as sharedActions } from '../../redux/shared'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}))

export const SignUpView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sharedActions.getStatus())
  }, [])
  const backendStatus = useSelector(state => state.shared.backendStatus)
  const props = { backendStatus }

  return (
    <Grid container className={classes.root} justify={'center'} >
      <Grid item container alignContent={'center'} lg={3} md={5} sm={7} xs={12}>
        <SignUp {...props}/>
      </Grid>
    </Grid>
  )
}
