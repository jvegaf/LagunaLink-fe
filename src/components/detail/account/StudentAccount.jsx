import React from 'react'
import RegisterFormik from '../../form/student/register'
import Card from '../../shared/Card'

export const StudentAccount = (props) => {
  return (
    <Card title="Perfil">
      <RegisterFormik {...props} />
    </Card>
  )
}
