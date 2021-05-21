import { makeStyles } from '@material-ui/core'
import React from 'react'
import { CompanyForm } from '../../form/company/register'
import Card from '../../shared/Card'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const CompanyAccount = props => {
  const classes = useStyles()
  props = {...props, newRegistry: false}

  return (
    <Card className={classes.root} title="Perfil">
      <CompanyForm {...props} />
    </Card>
  )
}
