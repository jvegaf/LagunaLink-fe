import { makeStyles } from '@material-ui/core'
import React from 'react'
import { JobOpeningForm } from '../../form/company/jobOpeningForm'
import Card from '../../shared/Card'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const JobOpening = ({createdAt, ...rest}) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} title={`Oferta creada el ${createdAt}`}>
      <JobOpeningForm {...rest} />
    </Card>
  )
}
