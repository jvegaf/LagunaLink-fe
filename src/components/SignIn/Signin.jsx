import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBLink, MDBCard, MDBCardBody } from 'mdbreact'
import { ModalView } from '../ModalView/ModalView'
import { HeadTitle } from '../shared/HeadTitle'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailInput } from '../Form/EmailInput'
import { PasswordInput } from '../Form/PasswordInput'

export function SignInComponent() {
  const history = useHistory()
  const { status, setStatus, signIn } = useUser()
  const methods = useForm()
  const [modal, setModal] = useState({
    open: false,
    body: '',
  })

  const onSubmit = data => {
    setStatus(0)
    setModal({ open: false, body: '' })
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
        setModal({
          open: true,
          body: 'Necesitas verificar tu cuenta antes de ingresar',
        })
        break
    }
  }, [history, status, setModal])

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="7" sm="12">
          <MDBCard className="p-4">
            <MDBCardBody>
              {modal.open && <ModalView open={modal.open} body={modal.body} />}
              <HeadTitle content="Iniciar Sesion" />
              <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="text-center">
                  <EmailInput />
                  <PasswordInput />
                  <MDBBtn type="submit">Entrar</MDBBtn>
                  </div>
                </form>
              </FormProvider>
              <MDBRow className="justify-content-end mt-4">
                <MDBLink to="/signup">¿No tienes una cuenta? Registrate</MDBLink>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
