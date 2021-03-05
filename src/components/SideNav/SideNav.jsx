import { MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem, MDBTypo } from 'mdbreact'
import React from 'react'
import { LLAvatar } from '../shared/LLAvatar'
import './../shared/styles.css'

export const SideNav = ({ name, elements }) => {
  return (
    <MDBContainer>
      <MDBListGroup>
        <MDBListGroupItem>
          <div className="d-flex w-100 flex-column align-items-center">
            <LLAvatar />
            <MDBTypo className="text-center mt-4 fw400" tag="h2">
              {name}
            </MDBTypo>
          </div>
        </MDBListGroupItem>
        {elements.map((element, index) => (
          <MDBListGroupItem hover href="#" key={index}>
            <div className="row w-100">
              <div className="col-2">
                <MDBIcon icon={element.icon} size="2x" />
              </div>
              <div className="col-10 d-flex align-items-center">
                <div className="ml-2 fs13">{element.name}</div>
              </div>
            </div>
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBContainer>
  )
}
