import React from 'react'
import Avatar from '../shared/Avatar'
import Element from '../shared/Element'
import { Container } from 'react-bootstrap'
import H2Title from '../shared/H2Title'
import './../shared/styles.css'
import { DetailButton } from '../Detail/Button/index'

function Profile () {
  return (
    <Container className="d-flex ll-85 bg-white flex-column align-items-center ll-corners" fluid>
      <div className="row w-100 h-100">
        <div className="col pt-5">
          <div className="mt-5 w-100 d-flex flex-column align-items-center">
            <H2Title text="Profile" className="mb-5" />
            <Avatar className="mt-5"/>
            <Element title="Nombre" content="Labore deserunt nostrud adipisicing laboris. Consectetur irure excepteur ad laborum do adipisicing. Do sit laborum quis laborum ex dolor ipsum mollit ullamco magna esse sit. Ipsum anim cupidatat incididunt commodo sit exercitation culpa commodo in sunt consequat duis. Pariatur in deserunt labore amet ut mollit pariatur consequat excepteur." />
            <DetailButton content="Actualizar Perfil" />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </Container>
  )
}

export default Profile
