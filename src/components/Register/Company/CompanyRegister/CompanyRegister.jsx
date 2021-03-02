import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useCompany } from '../../../../hooks/useCompany'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput
} from 'mdbreact'
import { HeadTitle } from '../../../shared/HeadTitle'

export const CompanyRegister = () => {
  const history = useHistory()
  const { registerCompany } = useCompany()

  const [data, setData] = useState({
    name: '',
    description: '',
    address: '',
    postalCode: '',
    region: '',
    city: ''
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    registerCompany(data).then((status) => {
      if (status === 201) history.push('/main')
    })
  }
  return (
    <MDBContainer>
    <MDBRow className="justify-content-center">
      <MDBCol md="7" sm="12">
        <HeadTitle content="Registro de Empresa" />
        <form onSubmit={onSubmit}>
          <p className="h5 text-center mb-4"></p>
          <div className="grey-text">
            <MDBInput label="Nombre" icon="building"
            group type="text" validate error="wrong" name="name"
              onChange={handleInputChange} success="right" />
            <MDBInput label="Descripcion" name="description" onChange={handleInputChange}
            icon="glasses" group type="text" validate />
            <MDBInput label="Direccion" name="address" onChange={handleInputChange}
            icon="map-marker-alt" group type="text" validate />
            <MDBInput label="Codigo Postal" name="postalCode" onChange={handleInputChange}
            icon="envelope" group type="text" validate />
            <MDBInput label="Provincia" name="region" onChange={handleInputChange}
            icon="map-marked" group type="text" validate />
            <MDBInput label="Poblacion" name="city" onChange={handleInputChange}
            icon="city" group type="text" validate />
          </div>
          <div className="text-center">
            <MDBBtn type="submit" color="default">Completar Registro</MDBBtn>
          </div>
        </form>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  )
}
