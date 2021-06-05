/* eslint-disable no-unused-vars */
import { Box, Button, Divider, List, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import React, { useContext } from 'react'
import { LayoutContext } from '../../layouts/dashboard/Root'
import { StyledAvatar } from '../avatar/StyledAvatar'
import NavItem from './NavItem'
import NavItemCollapsed from './NavItemCollapsed'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/user'

const useStyles = makeStyles(() => ({
  avatar: {
    marginBottom: 10,
  },
  name: {
    display: 'block',
    textOverflow: 'ellipsis',
    fontFamily: 'Poppins',
    fontSize: '1.7rem',
    letterSpacing: -1,
    fontWeight: 300,
  }
}))

const NavBar = props => {
  const classes = useStyles()
  const { user, navConf, mobile } = props
  const dispatch = useDispatch()
  const ctx = useContext(LayoutContext)
  const { collapsed } = ctx
  const userName = user.profile !== null ? `${user.profile.name} ${user.profile.surname || ''}` : ''

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Toolbar />
      <Divider />
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Box className={classes.avatar}>
          <StyledAvatar size={64} thickness={2} src={user.avatar} />
        </Box>
        {!collapsed && (
          <Typography className={classes.name}>
            {userName}
          </Typography>
        )}
        <Typography color="textSecondary" variant="body2">
          {navConf.userRole}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {navConf.items.map(item =>
            collapsed ? (
              <NavItemCollapsed href={item.href} key={item.title} icon={item.icon} />
            ) : (
              <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
            )
          )}
        </List>
      </Box>
      <Box flexGrow={1} />
      {mobile && (
        <Box p={2} pb={8}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<ExitToApp />}
            onClick={() => dispatch(actions.signOut())}
          >
            Salir
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default NavBar
