import { Divider, Drawer, List, ListItem, ListItemText, makeStyles, Toolbar } from '@material-ui/core'
import { MDBContainer, MDBIcon } from 'mdbreact'
import React from 'react'

const drawerWidth = 280

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    // zIndex: 'auto',
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    zIndex: 'auto',
    width: drawerWidth
  },
  drawerContainer: {
    marginTop: 200
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

export const NavDrawer = ({ elements }) => {
  const classes = useStyles()
  return (
    <MDBContainer>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Divider />
          <List>
            {elements.map((element, index) => (
              <ListItem button key={index}>
                <MDBIcon icon={element.icon} size="2x" className="mr-4"/>
                <ListItemText primary={element.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
    </MDBContainer>
  )
}
