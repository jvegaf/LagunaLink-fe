import { Avatar, Box, Divider, List, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import NavItem from './NavItem'


// const user = {
//   avatar: '/static/images/avatars/avatar_5.png',
//   role: 'Estudiante',
//   name: 'Manuel Bravo',
// }

const useStyles = makeStyles(() => ({
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}))

const NavBar = ({ user, config}) => {
  const classes = useStyles()

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Toolbar />
      <Divider />
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} component={RouterLink} src={user.avatar} to="/app/account" />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {config.role}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {config.items.map(item => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  )
}

export default NavBar
