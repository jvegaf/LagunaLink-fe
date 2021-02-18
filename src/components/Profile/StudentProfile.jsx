import React from 'react'
import Avatar from '../shared/Avatar'
import { Element } from '../shared/Element'
import { Container } from 'react-bootstrap'
import H2Title from '../shared/H2Title'
import './../shared/styles.css'
import { useUser } from '../../hooks/useUser'
import { useStudent } from '../../hooks/useStudent'
import { SmallButton } from '../Detail/Button/SmallButton'

export const StudentProfile = () => {
  const { token, userId } = useUser()
  const {
    getProfile,
    name,
    surname,
    lastname,
    qualifications,
    languages,
    jobExperiences
  } = useStudent()

  getProfile(token, userId)

  const surnames = `${surname} ${lastname}`
  const quals = qualifications === undefined ? <SmallButton content="Agregar Titulacion" path="/student/register/qualification" /> : qualifications
  const langs = languages === undefined ? <SmallButton content="Agregar Idioma" path="/student/register/language" /> : languages
  const jobs = jobExperiences === undefined ? <SmallButton content="Agregar experiencia laboral" path="/student/register/job_experience" /> : jobExperiences

  return (
    <Container className="d-flex ll-85 bg-white flex-column align-items-center ll-corners" fluid>
      <div className="row w-100 h-100">
        <div className="col pt-5">
          <div className="mt-5 w-100 d-flex flex-column align-items-center">
            <H2Title text="Perfil" className="mb-5" />
            <Avatar className="mt-5 mb-2"/>
            <Element title="Nombre" content={ name } />
            <Element title="Apellidos" content={ surnames } />
            <Element title="Titulacion" content={ quals } />
            <Element title="Idioma" content={ langs } />
            <Element title="Experiencias previas" content={ jobs } />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </Container>
  )
}
