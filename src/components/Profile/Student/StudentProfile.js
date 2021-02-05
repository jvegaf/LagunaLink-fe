import React from 'react'
import H1Title from './../../shared/H1Title'
import Avatar from './../../shared/Avatar'
import Element from './../../shared/Element'

function StudentProfile () {
  return (
    <div>
      <H1Title text="Profile" />
      <Avatar />
      <Element title="prueba" content="esto es una prueba" />
    </div>
  )
}

export default StudentProfile
