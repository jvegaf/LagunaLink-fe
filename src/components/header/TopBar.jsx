import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import InputIcon from '@material-ui/icons/Input'
import { Logo } from '../logo/Logo'
import { actions } from '../../redux/user'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {},
  toolbar: {
    // marginLeft: 256
  },
  avatar: {
    width: 60,
    height: 60,
  }
}))

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [notifications] = useState([])

  return (
    <AppBar className={clsx(classes.root, className)} elevation={3} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Box flexGrow={1} />
        <Hidden smDown>
          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => dispatch(actions.signOut())}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <Logo />
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
}

export default TopBar
