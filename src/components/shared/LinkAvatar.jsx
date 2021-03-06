import React from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16)
  }
}))

export function LinkAvatar() {
  const classes = useStyles()
  return (
    <Avatar className={classes.large}>
      <AccountCircle className={classes.large}/>
    </Avatar>
  )
}
