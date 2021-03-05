import React from 'react'
import { CompanyRegister } from '../../components/Register/Company/CompanyRegister/CompanyRegister'
import { StudentRegister } from '../../components/Register/Student/StudentRegister/StudentRegister'
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'

export const RegisterPage = props => {
  const accType = props.match.params.accountType

  return (
    <MDBContainer fluid>
      <MDBRow className="vh-100 justify-content-center">
        <MDBCol lg="5" md="8" sm="12" className="align-self-center justify-content-center">
          {accType === 'student' ? <StudentRegister /> : <CompanyRegister />}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
