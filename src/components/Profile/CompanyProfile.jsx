import React from 'react'
import './../shared/styles.css'
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'

export const CompanyProfile = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="2"></MDBCol>
        <MDBCol md="10"></MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
