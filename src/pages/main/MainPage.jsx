import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useEffect } from 'react'
import { Header } from '../../components/header/Header'
import { useCompany } from '../../hooks/useCompany'
import { useStudent } from '../../hooks/useStudent'
import { useUser } from '../../hooks/useUser'

export function MainPage() {

  const { userRole } = useUser()
  const { getStudentProfile } = useStudent()
  const { getCompanyProfile } = useCompany()

  useEffect(() => {
    if(userRole ==='ROLE_STUDENT'){
      getStudentProfile()
    }
    if(userRole ==='ROLE_COMPANY'){
      getCompanyProfile()
    }
  }, [userRole])

  return (
    <MDBContainer fluid>
      <MDBRow className="vh-100">
        <MDBCol>
          <Header />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
