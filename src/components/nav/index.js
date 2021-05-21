import { Avatar, Box, Divider, List, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import NavItem from './NavItem'



const useStyles = makeStyles(() => ({
  avatar: {
    width: 64,
    height: 64,
    marginBottom: 10
  },
}))

const NavBar = ({ user, config}) => {
  const classes = useStyles()

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Toolbar />
      <Divider />
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} src={user.avatar} />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.prefName}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {config.userRole}
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
