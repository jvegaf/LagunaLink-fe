import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact'

export const JobOpeningCard = ({ jobOpening }) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: '22rem' }}>
        <MDBCardImage className="morpheus-den-gradient color-block-5 mb-3 mx-auto z-depth-1-half" waves />
        <MDBCardBody>
          <MDBCardTitle>{jobOpening.title}</MDBCardTitle>
          <MDBCardText>{jobOpening.position}</MDBCardText>
          <MDBBtn href="#">Ver Oferta</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}
