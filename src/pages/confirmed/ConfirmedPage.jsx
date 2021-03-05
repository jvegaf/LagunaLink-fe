import { MDBBtn, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBContainer, MDBRow } from 'mdbreact'
import React from 'react'

export const ConfirmedPage = () => {
  return (
    <MDBContainer fluid>
      <MDBRow className="vh-100">
        <MDBCol className="d-flex align-items-center justify-content-center">
          <MDBCard className="p-5 text-center">
            <MDBCardTitle>
              <h2>Cuenta activada</h2>
            </MDBCardTitle>
            <MDBCardBody>
              <p>Gracias por confirmar tu cuenta, ahora puedes continuar con el registro</p>
            </MDBCardBody>
            <MDBBtn href="/signin" className="w-50 w-responsive align-self-center" color="secondary">
              Volver
            </MDBBtn>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
