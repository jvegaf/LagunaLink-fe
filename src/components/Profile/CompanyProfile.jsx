import React from 'react'
import Avatar from '../shared/Avatar'
import { Element } from '../shared/Element'
import { Container } from 'react-bootstrap'
import H2Title from '../shared/H2Title'
import './../shared/styles.css'
import { DetailButton } from '../Detail/Button/DetailButton'
import { useUser } from '../../hooks/useUser'
import { useCompany } from '../../hooks/useCompany'

export const CompanyProfile = () => {
  const { token, userId } = useUser()
  const {
    getProfile,
    name,
    description,
    address,
    postalCode,
    region,
    city
  } = useCompany()

  getProfile(token, userId)

  return (
    <Container className="d-flex ll-85 bg-white flex-column align-items-center ll-corners" fluid>
      <div className="row w-100 h-100">
        <div className="col pt-5">
          <div className="mt-5 w-100 d-flex flex-column align-items-center">
            <H2Title text="Perfil" className="mb-5" />
            <Avatar className="mt-5"/>
            <Element title="Nombre" content={ name } />
            <Element title="Descripcion" content={ description } />
            <Element title="Direcion" content={ address } />
            <Element title="Codigo Postal" content={ postalCode } />
            <Element title="Provincia" content={ region } />
            <Element title="Poblacion" content={ city } />
            <DetailButton content="Actualizar Perfil" />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </Container>
  )
}
