/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import { Header } from '../../components/Header/Header'
import { Profile } from '../../components/Profile/Profile'
import { NavDrawer } from '../../components/SideNav/NavDrawer'
import { SideNav } from '../../components/SideNav/SideNav'
import { useCompany } from '../../hooks/useCompany'
import { useStudent } from '../../hooks/useStudent'
import { useUser } from '../../hooks/useUser'
import '../__shared__/styles.css'

export default function DashboardPage () {
  const { userRole } = useUser()
  const { studentNavItems } = useStudent()
  const { companyNavItems } = useCompany()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (userRole === 'ROLE_STUDENT') {
      setItems(studentNavItems)
    }
    if (userRole === 'ROLE_COMPANY') {
      setItems(companyNavItems)
    }
  }, [])

  return (
    <MDBContainer fluid>
    <Header />
      <MDBRow className="vh-100">
        <MDBCol lg="3" className="m-auto">
          <NavDrawer elements={items} />
        </MDBCol>
        <MDBCol lg="9" className="d-flex align-items-center">
          <Profile />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
