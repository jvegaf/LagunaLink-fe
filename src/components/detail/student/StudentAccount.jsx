import React from 'react'
import RegisterFormik from '../../form/student/register'
import Card from '../../shared/Card'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    width: 600
  },
}))

export const StudentAccount = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root} title="Perfil">
      <RegisterFormik {...props} />
    </Card>
  )
}
