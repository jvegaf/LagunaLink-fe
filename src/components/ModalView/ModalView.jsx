import { MDBModal, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const ModalView = (props) => {
  const [modal, setModal] = useState(false)
  const history = useHistory()

  useEffect(() => {
    props.open === true ? setModal(true) : setModal(false)
  }, [props.open])

  const toggle = () => {
    setModal(!modal)
  }

  const closeModal = () => {
    toggle()
    if (props.redirect !== undefined) { redirectTo(props.redirect) }
  }

  const redirectTo = (path) => {
    history.push(path)
  }

  return (
    <MDBModal isOpen={modal} toggle={toggle} centered>
      <MDBModalBody>{props.body}</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={closeModal}>Cerrar</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  )
}
