import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBTypography } from 'mdbreact'

export const StudentRegister = () => {
  const { registerStudent } = useStudent()
  const [data, setData] = useState({
    name: '',
    surname: '',
    lastname: '',
  })
  const history = useHistory()

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = data => {
    registerStudent(data).then(status => {
      if (status === 201) history.push('/main')
    })
  }

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="7" sm="12">
          <MDBTypography tag="h2" className="text-center mb-5">
            Registro de Estudiante
          </MDBTypography>
          <form onSubmit={onSubmit}>
            <p className="h5 text-center mb-4"></p>
            <div className="grey-text">
              <MDBInput
                label="Nombre"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                name="name"
                onChange={handleInputChange}
                success="right"
              />
              <MDBInput
                label="Primer Apellido"
                name="surname"
                onChange={handleInputChange}
                icon="user"
                group
                type="text"
                validate
              />
              <MDBInput
                label="Segundo Apellido"
                name="lastname"
                onChange={handleInputChange}
                icon="user"
                group
                type="text"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" color="default">
                Completar Registro
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
