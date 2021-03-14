import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { Rating } from '../../shared/Rating'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

export const Language = ({name, speak, write}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={6}>
      <Typography variant={'h5'} align={'center'}>
        {name}
      </Typography>
      <div className="row mt-4">
        <div className="col-md-6 col-sm-12">
          <Rating value={speak} label={'Nivel Oral'}/>
        </div>
        <div className="col-md-6 col-sm-12">
          <Rating value={write} label={'Nivel Escrito'}/>
        </div>
      </div>
    </Paper>
  )
}
