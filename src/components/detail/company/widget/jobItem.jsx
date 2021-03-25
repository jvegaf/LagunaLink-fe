import React from 'react'
import { makeStyles, ListItem, } from '@material-ui/core'

const useStyles = makeStyles(() =>({
  root: {},
  item: {
    width: '100%',
    display: 'flex'
  }
}))

const JobItem = props => {
  const { index, selectedIdx, job, changeIdx } = props
  const classes = useStyles()
  const handleClick = (event, index) => changeIdx(index)
  const idx = index+1
  return (
      <ListItem 
        selected={index === selectedIdx}
        button
        onClick={(event) => handleClick(event, index)}
        className={classes.item} 
        disableGutters >
          <div>{idx}</div>
          <div>{job.position}</div>
          <div>{job.createdAt}</div>
      </ListItem>
  )
}

export default JobItem
