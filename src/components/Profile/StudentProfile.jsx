import React from 'react'
import './../shared/styles.css'
import { useStudent } from '../../hooks/useStudent'
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import { SideNav } from '../SideNav/SideNav'
import { StudentAccount } from '../Detail/account/StudentAccount'

export const StudentProfile = () => {
  const { navItems, name } = useStudent()


  return (
    <MDBContainer fluid>
      <MDBRow className="vh-100">
        <MDBCol md="4" className="mt-sidenav">
          <SideNav name={name} elements={navItems} />
        </MDBCol>
        <MDBCol md="8" className="d-flex align-items-center">
          <StudentAccount />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
