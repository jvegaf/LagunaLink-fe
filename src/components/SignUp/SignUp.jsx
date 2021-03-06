/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { ModalView } from '../ModalView/ModalView'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBNavLink,
  MDBCard,
  MDBCardBody,
} from 'mdbreact'
import { HeadTitle } from '../shared/HeadTitle'
import { RoleSelectInput } from '../form/RoleSelectInput'
import { EmailInput } from '../form/EmailInput'
import { PasswordInput } from '../form/PasswordInput'
import { FormProvider, useForm } from 'react-hook-form'

export const SignUp = () => {
  const { setStatus, signUp } = useUser()
  const methods = useForm()
  const [modal, setModal] = useState({
    open: false,
    body: '',
    redirect: undefined,
  })

  const onSubmit = data => {
    setModal({ open: false, body: '', redirect: undefined })
    setStatus(0)
    signUp(data)
      .then(status => {
        if (status === 201) {
          setModal({
            open: true,
            body: 'Email de confirmacion enviado. Mira en tu buzon',
            redirect: '/signin',
          })
        }

        if (status === 430) {
          setModal({
            open: true,
            body: 'El Email ya estaba registrado. Ingresa en tu cuenta',
            redirect: '/signin',
          })
        }
      })
      .catch(e => console.log(e))
  }

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="8" sm="12">
          <MDBCard className="p-4">
            <MDBCardBody>
              {modal.open && <ModalView open={modal.open} body={modal.body} redirect={modal.redirect} />}
              <HeadTitle content="Registro" />
              <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="text-center">
                    <RoleSelectInput></RoleSelectInput>
                    <EmailInput />
                    <PasswordInput />
                    <MDBBtn type="submit" color="default">
                      Registrar
                    </MDBBtn>
                  </div>
                </form>
              </FormProvider>
              <MDBNavLink to="/signin" className="mt-5 text-center">
                ¿Ya tienes una cuenta? Ingresa
              </MDBNavLink>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
