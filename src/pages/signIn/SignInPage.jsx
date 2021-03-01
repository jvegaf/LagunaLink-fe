import React from 'react'
import '../__shared__/styles.css'
import { SignInComponent } from '../../components/SignIn/Signin'
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'

export default function SignInPage () {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="7" className="d-none d-md-block">
          <div className="handshake-bg"></div>
        </MDBCol>
        <MDBCol md="5" sm="12" className="d-flex align-items-center">
          <SignInComponent />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
