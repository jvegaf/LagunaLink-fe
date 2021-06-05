import { Button, Divider, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    minHeight: '3em',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5)
  },
  title: {
    fontFamily: 'Poppins',
    color: theme.palette.primary.contrastText,
    fontWeight: 200,
    fontSize: '1.7rem',
    letterSpacing: 1.2,
    marginLeft: theme.spacing(2)
  },
  content: {
    width: '100%',
    backgroundColor: '#fff',
  },
}))

export const LinkCard = props => {
  const classes = useStyles()
  const { title, action, children, actionTitle } = props

  return (
    <Paper className={classes.root}>
        {title && (
          <div className={classes.header}>
            <Typography className={classes.title}>{title}</Typography>
          </div>
        )}
        {title && <Divider />}
        <div className={classes.content}>{children}</div>
      {action && <Divider />}
      {action && (
          <Button onClick={action} color="primary" fullWidth variant="text">
            {actionTitle}
          </Button>
      )}
    </Paper>
  )
}
