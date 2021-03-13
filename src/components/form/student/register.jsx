/* eslint-disable no-unused-vars */
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'

export const RegisterForm = ({prefname, prefsurname, preflastname}) => {

  const [data, setData] = useState({
    name: prefname,
    surname: prefsurname,
    lastname: preflastname
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  

  const onSubmit = () => {
    alert(data.name)
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField label="Nombre" value={data.name} onChange={handleInputChange} name="name" />
      <TextField label="Nombre2" value={data.surname} onChange={handleInputChange} name="name" />
      <TextField label="Nombre3" value={data.lastname} onChange={handleInputChange} name="name" />
        <Button type="submit" color="default">
          Completar Registro
        </Button>
    </form>
  )
}
