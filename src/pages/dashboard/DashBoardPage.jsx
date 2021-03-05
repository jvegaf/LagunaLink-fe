import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React from 'react'
import { Header } from '../../components/Header/Header'
import { useUser } from '../../hooks/useUser'
import '../__shared__/styles.css'
import { StudentProfile } from '../../components/Profile/StudentProfile'
import { CompanyProfile } from '../../components/Profile/CompanyProfile'

export default function DashboardPage() {
  const { userRole } = useUser()
  const profile = userRole === 'ROLE_STUDENT' ? <StudentProfile /> : <CompanyProfile />

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <Header />
          {profile}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
