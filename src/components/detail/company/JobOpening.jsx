import { makeStyles } from '@material-ui/core'
import React from 'react'
import { JobOpeningForm } from '../../form/company/jobOpeningForm'
import Card from '../../shared/Card'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const JobOpening = props => {
  const classes = useStyles()
  const { position } = props
  return (
    <Card className={classes.root} title={`${position}`}>
      <JobOpeningForm {...props} />
    </Card>
  )
}
