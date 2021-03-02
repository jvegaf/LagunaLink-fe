import React from 'react'
import { LLAvatar } from '../shared/LLAvatar'
import { Element } from '../shared/Element'
import './../shared/styles.css'
import { useStudent } from '../../hooks/useStudent'
import { SmallButton } from '../Detail/Button/SmallButton'
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import { HeadTitle } from '../shared/HeadTitle'

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
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="6">
          <HeadTitle content="Perfil" />
          <LLAvatar className="align-self-center mt-5 mb-2"/>
          <Element title="Nombre" content={ name } />
          <Element title="Apellidos" content={ surnames } />
          <Element title="Titulacion" content={ qual } />
          <Element title="Idiomas" content={ <SmallButton content="Agregar Idioma" path="/student/register/language" /> } />
          <Element title="" content={ languages.map((lang, index) => {
            return (
              <div key={index}>
                <p>{lang.name}</p>
              </div>
            )
          }) } />
          <Element title="Experiencia" content={ <SmallButton content="Agregar experiencia laboral" path="/student/register/job_experience" /> } />
          <Element title="" content={ jobExperiences.map((job, index) => {
            return (
              <div key={index}>
                <p><span>{job.company}</span>  <small>{job.start_date}</small> <small>{job.end_date}</small></p>
              </div>
            )
          }) } />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
