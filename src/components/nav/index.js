import { Avatar, Box, Divider, List, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { LayoutContext } from '../../layouts/dashboard/Root'
import NavItem from './NavItem'
import NavItemCollapsed from './NavItemCollapsed'

const useStyles = makeStyles(() => ({
  avatar: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
}))

const NavBar = props => {
  const classes = useStyles()
  const { user, navConf } = props
  const ctx = useContext(LayoutContext)
  const { collapsed } = ctx
  const userName = user.profile !== null ? `${user.profile.name} ${user.profile.surname || ''}` : ''

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Toolbar />
      <Divider />
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} src={user.avatar} />
        {!collapsed && <Typography className={classes.name} color="textPrimary" variant="h5">
          {userName}
        </Typography>}
        <Typography color="textSecondary" variant="body2">
          {navConf.userRole}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {navConf.items.map(item => 
          collapsed ? 
            (<NavItemCollapsed href={item.href} key={item.title} icon={item.icon} />):
            (<NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />)
          )
        }
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  )
}

export default NavBar
