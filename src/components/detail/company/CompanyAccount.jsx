import { makeStyles } from '@material-ui/core'
import React from 'react'
import { CompanyForm } from '../../form/company/register'
import { LinkCard } from '../../shared/Card'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const CompanyAccount = props => {
  const classes = useStyles()
  props = {...props, newRegistry: false}

  return (
    <LinkCard className={classes.root} title="PERFIL">
      <CompanyForm {...props} />
    </LinkCard>
  )
}
