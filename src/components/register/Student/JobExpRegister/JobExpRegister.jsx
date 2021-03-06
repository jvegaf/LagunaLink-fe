import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBNavLink, MDBRow } from 'mdbreact'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'
import { Title } from '../../../shared/Title'

export const JobExpRegister = () => {
  const history = useHistory()
  const { addJobExperience } = useStudent()
  const [data, setData] = useState({
    company: '',
    position: '',
    responsibilities: '',
    start_date: '',
    end_date: '',
  })

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    addJobExperience(data).then(status => {
      if (status === 200) {
        history.goBack()
      }
    })
  }

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="7" sm="12">
          <Title content="Tu Curriculum" />
          <form onSubmit={onSubmit}>
            <p className="h5 text-center mb-4"></p>
            <div className="grey-text">
              <MDBInput
                label="Empresa"
                icon="envelope"
                group
                type="text"
                validate
                error="wrong"
                name="company"
                onChange={handleInputChange}
                success="right"
              />
              <MDBInput
                label="Puesto"
                name="position"
                onChange={handleInputChange}
                icon="lock"
                group
                type="text"
                validate
              />
              <MDBInput
                label="Responsabilidades"
                name="responsibilities"
                onChange={handleInputChange}
                icon="lock"
                group
                type="textarea"
                rows="4"
                validate
              />
              <MDBInput
                label="Comienzo"
                name="start_date"
                onChange={handleInputChange}
                icon="lock"
                group
                type="month"
                validate
              />
              <MDBInput
                label="Terminacion"
                name="end_date"
                onChange={handleInputChange}
                icon="lock"
                group
                type="month"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" color="default">
                Guardar
              </MDBBtn>
            </div>
          </form>
          <MDBNavLink to="/dashboard" className="mt-5 text-center">
            Volver
          </MDBNavLink>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
