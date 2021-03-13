import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const user = {
  avatar: '/static/images/avatars/avatar_6.png'
}

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    marginBottom: 10
  },
}))

const Profile = ({ name, role }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} >
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${role}`}
          </Typography>
          <Typography className={classes.dateText} color="textSecondary" variant="body1">
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Subir Foto
        </Button>
      </CardActions>
    </Card>
  )
}

export default Profile
