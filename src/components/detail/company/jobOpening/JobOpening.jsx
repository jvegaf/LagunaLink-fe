import { makeStyles } from '@material-ui/core'
import React from 'react'
import { JobOpeningForm } from '../../../form/company/jobOpeningForm'
import { LinkCard } from '../../../shared/Card'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
}))

export const JobOpening = props => {
  const classes = useStyles()
  const { position } = props
  return (
    <LinkCard className={classes.root} title={position}>
      <JobOpeningForm {...props} />
    </LinkCard>
  )
}
