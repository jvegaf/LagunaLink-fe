import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBBtn
} from 'mdbreact'
import { ModalView } from '../ModalView'

export function SignInComponent () {
  const history = useHistory()
  const { status, setStatus, signIn } = useUser()
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [modal, setModal] = useState({
    open: false,
    body: ''
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = (e) => {
    setStatus(0)
    setModal({ open: false, body: '' })
    e.preventDefault()
    signIn(data)
  }

  useEffect(() => {
    switch (status) {
      case 200:
        history.push('/main')
        break
      case 230:
        history.push('/register/student')
        break
      case 231:
        history.push('/register/company')
        break
      case 400:
        setModal({ open: true, body: 'Correo o Contraseña erroneo' })
        break
      case 450:
        setModal({ open: true, body: 'Necesitas verificar tu cuenta antes de ingresar' })
        break
    }
  }, [history, status, setModal])

  return (
    <MDBContainer fluid>
      {modal.open && <ModalView open={modal.open} body={modal.body} />}
      <MDBRow className="justify-content-center">
        <MDBCol md="7" sm="12">
          <form onSubmit={onSubmit}>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput label="Correo Electronico" name="email" icon="envelope" group type="email" validate
                error="wrong" onChange={handleInputChange}
                success="right" />
              <MDBInput label="Contraseña" name="password"
              onChange={handleInputChange} icon="lock" group type="password" validate />
            </div>
            <div className="text-center">
              <MDBBtn type="submit">Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
