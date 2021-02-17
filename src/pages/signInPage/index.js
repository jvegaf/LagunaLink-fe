import React from 'react'
import './signIn.css'
import { SignInComponent } from './../../components/SignIn/index'

export default function SignInPage () {
  return (
    <div className="row m-0">
      <div className="col-md-6 p-0">
        <div className="handshake-bg"></div>
      </div>
      <div className="col-md-6 p-0 align-self-center">
        <SignInComponent />
      </div>
    </div>
  )
}
