import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { useCompany } from '../../hooks/useCompany'
import { useStudent } from '../../hooks/useStudent'
import { useUser } from '../../hooks/useUser'

export function MainPage() {
  const { isSigned, userRole } = useUser()
  const history = useHistory()
  const { getStudentProfile } = useStudent()
  const { getCompanyProfile } = useCompany()

  useEffect(() => {
    if (!isSigned) {
      history.push('/signin')
    }
    switch(userRole){
      case 'ROLE_STUDENT':
        getStudentProfile()
        break
      case 'ROLE_COMPANY':
        getCompanyProfile()
        break
    }
  }, [isSigned, userRole])

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
