import { MDBModal, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact'
import React, { useEffect, useState } from 'react'

export const ModalView = (props) => {
  const [modal, setModal] = useState(false)

  useEffect(() => {
    props.open === true ? setModal(true) : setModal(false)
  }, [props.open])

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <MDBModal isOpen={modal} toggle={toggle} centered>
      <MDBModalBody>{props.body}</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  )
}
