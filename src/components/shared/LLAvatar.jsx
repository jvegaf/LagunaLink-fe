import React from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import avatarPh from '../../assets/avatar_ph.png'

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}))

export function LLAvatar() {
  const classes = useStyles()
  return (
    <div className="w-100 d-flex justify-content-center">
      <Avatar src={avatarPh} className={classes.large} />
    </div>
  )
}
