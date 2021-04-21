import React from 'react'
import { makeStyles, ListItem, ListItemText, ListItemAvatar, Avatar, } from '@material-ui/core'

const useStyles = makeStyles((theme) =>({
  root: {},
  item: {
    width: '100%',
    paddingLeft: theme.spacing(3)
  }
}))

const JobItem = props => {
  const { index, selectedIdx, job, changeIdx } = props
  const classes = useStyles()
  const handleClick = (event, index) => changeIdx(index)
  const idx = index+1
  return (
      <ListItem alignItems="flex-start"
        selected={index === selectedIdx}
        button
        onClick={(event) => handleClick(event, index)}
        className={classes.item} 
        disableGutters >
          <ListItemAvatar>
            <Avatar>{idx}</Avatar>
          </ListItemAvatar>
          <ListItemText
           primary={job.position}
           secondary={job.createdAt} />
      </ListItem>
  )
}

export default JobItem
