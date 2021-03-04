import React, { useEffect } from 'react'
import { useStudent } from '../../../hooks/useStudent'
import { useUser } from '../../../hooks/useUser'
import { HeadTitle } from '../../shared/HeadTitle'
import { LLAvatar } from '../../shared/LLAvatar'
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdbreact'

export const StudentAccount = () => {
  const { name, surname, lastname, getProfile } = useStudent()
  const { email } = useUser()

  useEffect(() => {
    if (name === '') {
      getProfile()
    }
  }, [])


  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody className="w-100 d-flex flex-column p-md-5">
          <HeadTitle content="Perfil" />
          <LLAvatar />
          <MDBRow className="justify-content-center">
            <MDBCol md="7" sm="12">
              <form>
                <p className="h5 text-center mb-4"></p>
                <div className="grey-text">
                  <label className="grey-text">
                    Nombre
                  </label>
                  <input type="text" name="name" value={name} className="form-control" />
                  <br />
                  <label className="grey-text">
                    Primer Apellido
                  </label>
                  <input type="text" name="surname" value={surname} className="form-control" />
                  <br />
                  <label className="grey-text">
                    Segundo Apellido
                  </label>
                  <input type="text" name="lastname" value={lastname} className="form-control" />
                  <br />
                  <label className="grey-text">
                    Correo Electronico
                  </label>
                  <input type="email" name="email" value={email} className="form-control" />
                  <br />
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}
