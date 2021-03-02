import React, { useState } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBNavLink, MDBRow } from 'mdbreact'
import { useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'
import { HeadTitle } from '../../../shared/HeadTitle'

export const QualificationRegister = () => {
  const history = useHistory()
  const { addQualification } = useStudent()
  const [data, setData] = useState({
    title: '',
    start_date: '',
    end_date: ''
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    addQualification(data)
      .then(status => {
        if (status === 200) { history.push('/dasboard') }
      })
  }

  return (

    <MDBContainer>
    <MDBRow className="justify-content-center">
      <MDBCol md="7" sm="12">
        <HeadTitle content="Tu Curriculum"/>
        <form onSubmit={onSubmit}>
          <p className="h5 text-center mb-4"></p>
          <div className="grey-text">
            <MDBInput label="Titulacion" icon="envelope"
            group type="text" validate error="wrong" name="company"
              onChange={handleInputChange} success="right" />
            <MDBInput label="Comienzo" name="start_date" onChange={handleInputChange}
            icon="lock" group type="month" validate />
            <MDBInput label="Terminacion" name="end_date" onChange={handleInputChange}
            icon="lock" group type="month" validate />
          </div>
          <div className="text-center">
            <MDBBtn type="submit" color="default">Guardar</MDBBtn>
          </div>
        </form>
        <MDBNavLink to='/dashboard' className="mt-5 text-center" >Volver</MDBNavLink>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  )
}
