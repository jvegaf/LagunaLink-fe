import { makeStyles } from '@material-ui/core'
import React from 'react'
import { JobOpeningForm } from '../../../form/company/jobOpeningForm'
import Card from '../../../shared/Card.js'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const JobOpening = props => {
  const classes = useStyles()
  return (
    <Card className={classes.root} title={`${props.position || 'No tienes ninguna oferta creada aun'}`}>
      {props.position && <JobOpeningForm {...props} />}
    </Card>
  )
}
