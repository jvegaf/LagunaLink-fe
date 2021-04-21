import { makeStyles } from '@material-ui/core'
import React from 'react'
import { CompanyForm } from '../../form/company/register'
import Card from '../../shared/Card'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const CompanyRegister = () => {
  const classes = useStyles()
  const props = {newRegistry: true}
  

  return (
    <Card className={classes.root} title="Registro nueva cuenta de Empresa">
      <CompanyForm {...props} />
    </Card>
  )
}
