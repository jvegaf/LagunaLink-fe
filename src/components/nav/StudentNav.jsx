import React, { useState } from 'react'
import { LinkAvatar } from '../shared/LinkAvatar'
import './../shared/styles.css'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core'
import { School, Language, Work, Assignment } from '@material-ui/icons'

const drawerWidth = 240

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    paddingTop: 100,
    width: drawerWidth,
    zIndex: 1000
  },
  drawerContainer: {
    overflow: 'auto'
  }
}))

export const StudentNav = ({change}) => {
  const classes = useStyles()
  const [selIndex, setSelIndex] = useState(0)
  const handleListItemClick = (event, index) => {
    setSelIndex(index)
    change(index)
  }


  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerContainer}>
        <List>
          <ListItem selected={selIndex === 0}
                    button onClick={(event) => handleListItemClick(event, 0)}>
            <div className="col">
              <div className="row justify-content-center m-3">
                <LinkAvatar/>
              </div>
              <div className="row justify-content-center m-3">
                <Typography variant={'h4'}>
                  {/* {name} */}
                </Typography>
              </div>
            </div>
          </ListItem>
          <ListItem selected={selIndex === 1}
                    button onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon><School /> </ListItemIcon>
            <ListItemText primary={'Titulacion'}/>
          </ListItem>
          <ListItem selected={selIndex === 2}
                    button onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemIcon><Language /> </ListItemIcon>
            <ListItemText primary={'Idiomas'}/>
          </ListItem>
          <ListItem selected={selIndex === 3}
                    button onClick={(event) => handleListItemClick(event, 3)}>
            <ListItemIcon><Work /></ListItemIcon>
            <ListItemText primary={'Exp. Laboral'}/>
          </ListItem>
          <ListItem selected={selIndex === 4}
                    button onClick={(event) => handleListItemClick(event, 4)}>
            <ListItemIcon><Assignment /></ListItemIcon>
            <ListItemText primary={'Ofertas Aplicadas'}/>
          </ListItem>
        </List>
        <Divider/>
      </div>
    </Drawer>
  )
}
