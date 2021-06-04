import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { SignInComponent } from '../../components/sign/Signin'
import { useDispatch, useSelector } from 'react-redux'
import { actions as sharedActions } from '../../redux/shared'
import React, { useEffect } from 'react'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  child: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export const SignInView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sharedActions.getStatus())
  }, [])
  const backendStatus = useSelector(state => state.shared.backendStatus)
  const props = { backendStatus }
  const classes = useStyles()

  return (
    <Grid container className={classes.root} >
      <Grid item className={classes.child} lg={3} md={5} sm={6} xs={12}>
        <SignInComponent {...props}/>
      </Grid>
    </Grid>
  )
}
