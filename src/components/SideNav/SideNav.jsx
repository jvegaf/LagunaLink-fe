import { MDBCard, MDBCardBody, MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem } from 'mdbreact'
import React from 'react'

export const SideNav = ({ elements }) => {
  return (
    <MDBContainer fluid>
      <MDBCard>
        <MDBCardBody>
          <MDBListGroup>
          { elements.map((element, index) => (
                <MDBListGroupItem key={index}>
                  <MDBIcon icon={element.icon} size="2x" className="mr-4"/>
                  {element.name}
                </MDBListGroupItem>
          ))}
          </MDBListGroup>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}
