import { makeStyles } from '@material-ui/core'
import React from 'react'
import { StudentForm } from '../../form/student/register'
import Card from '../../shared/Card'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const StudentRegister = () => {
  const classes = useStyles()
  const props = {newRegistry: true}

  return (
    <Card className={classes.root} title="Registro nueva cuenta de Estudiante">
      <StudentForm {...props} />
    </Card>
  )
}
