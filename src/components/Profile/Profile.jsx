import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React from 'react'

export const Profile = () => {
  return (
      <MDBContainer>
          <MDBRow className="justify-content-center">
              <MDBCol>
                <MDBCard>
                    <MDBCardBody>This is some text within a panel body.</MDBCardBody>
                </MDBCard>
              </MDBCol>
          </MDBRow>
      </MDBContainer>
  )
}
