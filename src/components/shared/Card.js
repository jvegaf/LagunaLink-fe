import { Button, Card, CardActions, CardContent, CardHeader, Divider, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    marginBottom: 10
  },
}))

const LinkCard = ({children, title, action, actionTitle}) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} >
      {title && (<CardHeader title={title} />)}
      {title && (<Divider />)}
      <CardContent>
        {children}
      </CardContent>
      {action && (<Divider />)}
      {action &&
      (<CardActions>
        <Button onClick={action} color="primary" fullWidth variant="text">
          {actionTitle}
        </Button>
      </CardActions>)}
    </Card>
  )
}

export default LinkCard
