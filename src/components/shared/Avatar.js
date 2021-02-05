import React from 'react'
import { Image } from 'react-bootstrap'
import avatarPh from '../../assets/avatar_ph.png'

function Avatar () {
  return (
    <div>
      <Image src={avatarPh} roundedCircle />
    </div>
  )
}

export default Avatar
