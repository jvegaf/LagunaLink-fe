/* eslint-disable no-unused-vars */
import React from 'react'
import Avatar from '../shared/Avatar'
import { Element } from '../shared/Element'
import { Container } from 'react-bootstrap'
import H2Title from '../shared/H2Title'
import './../shared/styles.css'
import { useStudent } from '../../hooks/useStudent'
import { SmallButton } from '../Detail/Button/SmallButton'

export const StudentProfile = () => {
  const {
    getProfile,
    name,
    surname,
    lastname,
    qualification,
    languages,
    jobExperiences
  } = useStudent()

  if (!name) {
    getProfile()
  }

  const surnames = `${surname} ${lastname}`
  const qual = qualification === undefined ? <SmallButton content="Agregar Titulacion" path="/student/register/qualification" /> : qualification.title

  return (
    <Container className="d-flex ll-85 bg-white flex-column align-items-center ll-corners" fluid>
      <div className="row w-100 h-100">
        <div className="col pt-5">
          <div className="mt-5 w-100 d-flex flex-column align-items-center">
            <H2Title text="Perfil" className="mb-5" />
            <Avatar className="mt-5 mb-2"/>
            <Element title="Nombre" content={ name } />
            <Element title="Apellidos" content={ surnames } />
            <Element title="Titulacion" content={ qual } />
            {/* <Element title="Idioma" content={ languages } /> */}
            <SmallButton content="Agregar Idioma" path="/student/register/language" />
            {/* <Element title="Experiencia" content={ jobExperiences } /> */}
            <SmallButton content="Agregar experiencia laboral" path="/student/register/job_experience" />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </Container>
  )
}
