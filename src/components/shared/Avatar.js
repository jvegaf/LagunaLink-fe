import React from 'react'
import { Image } from 'react-bootstrap'
import avatarPh from '../../assets/avatar_ph.png'

function Avatar () {
  return (
    <div className="row mt-5">
      <Image style={{ height: '100px', width: '100px' }} src={avatarPh} roundedCircle />
    </div>
  )
}

export default Avatar
