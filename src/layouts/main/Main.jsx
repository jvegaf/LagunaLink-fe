// @ts-nocheck
import { makeStyles } from '@material-ui/core'
import React from 'react'
import { ConfirmedView } from '../../views/sign/ConfirmedView'
import { SignInView } from '../../views/sign/SigninView'
import { SignUpView } from '../../views/sign/SignupView'
import TopBar from './TopBar'

const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #e3ffe7 0%, #d9e7ff 100%)',
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}))

export const Main = ({ reqView }) => {
  const classes = useStyles()

  const view = checkRequest(reqView)

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{view}</div>
        </div>
      </div>
    </div>
  )
}

const checkRequest = reqView => {
  switch (reqView) {
    case 'signin':
      return <SignInView />
    case 'signup':
      return <SignUpView />
    case 'confirmed':
      return <ConfirmedView />
  }
}
