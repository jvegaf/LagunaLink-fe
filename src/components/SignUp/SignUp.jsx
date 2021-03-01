/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { ModalView } from '../ModalView/ModalView'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBBox,
  MDBIcon,
  MDBNavLink,
  MDBTypography
} from 'mdbreact'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  }
}))

export const SignUp = () => {
  const singinPath = '/signin'
  const classes = useStyles()
  const history = useHistory()
  const { setStatus, signUp } = useUser()
  const [data, setData] = useState({
    role: '',
    email: '',
    password: ''
  })

  const [modal, setModal] = useState({
    open: false,
    body: '',
    redirect: undefined
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setModal({ open: false, body: '', redirect: undefined })
    setStatus(0)
    signUp(data)
      .then(status => {
        if (status === 201) {
          setModal({ open: true, body: 'Email de confirmacion enviado. Mira en tu buzon', redirect: '/signin' })
        }

        if (status === 430) {
          setModal({ open: true, body: 'El Email ya estaba registrado. Ingresa en tu cuenta', redirect: '/signin' })
        }
      }).catch(e => console.log(e))
  }

  return (
    <MDBContainer>
      {modal.open && <ModalView open={modal.open} body={modal.body} redirect={modal.redirect} />}
    <MDBRow className="justify-content-center">
      <MDBCol md="7" sm="12">
        <MDBTypography tag="h2" className="text-center mb-5">
          Registro
        </MDBTypography>
        <form onSubmit={onSubmit}>
          <p className="h5 text-center mb-4"></p>
          <div className="grey-text">
            <MDBBox display="flex" flex="row">
              <MDBIcon icon="user" size="2x" className="my-auto mr-1" />
              <FormControl className={classes.formControl}>
                <InputLabel id="role">Tipo de Cuenta</InputLabel>
                <Select
                  labelId="role"
                  name="role"
                  value={data.role}
                  onChange={handleInputChange}
                >
                  <MenuItem value={'ROLE_STUDENT'}>Estudiante</MenuItem>
                  <MenuItem value={'ROLE_COMPANY'}>Empresa</MenuItem>
                </Select>
              </FormControl>
            </MDBBox>
            <MDBInput label="Correo Electronico" icon="envelope"
            group type="email" validate error="wrong" name="email"
              onChange={handleInputChange} success="right" />
            <MDBInput label="Contraseña" name="password" onChange={handleInputChange}
            icon="lock" group type="password" validate />
          </div>
          <div className="text-center">
            <MDBBtn type="submit" color="default">Registrar</MDBBtn>
          </div>
        </form>
        <MDBNavLink to={singinPath} className="mt-5 text-center" >¿Ya tienes una cuenta? Ingresa</MDBNavLink>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  )
}
