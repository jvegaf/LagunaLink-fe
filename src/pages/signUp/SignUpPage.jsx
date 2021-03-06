import React from 'react'
import { SignUp } from '../../components/sign/SignUp'
import '../__shared__/styles.css'
import { MDBBox, MDBCol, MDBContainer, MDBRow } from 'mdbreact'

export const SignUpPage = () => {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="7" className="d-none d-md-block">
          <MDBBox className="building-bg" />
        </MDBCol>
        <MDBCol md="5" sm="12" className="d-flex align-items-center">
          <SignUp />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
