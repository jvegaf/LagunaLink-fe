import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { ModalView } from '../ModalView'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput
} from 'mdbreact'

export const SignUp = () => {
  const history = useHistory()
  const { setStatus, signUp } = useUser()
  const [data, setData] = useState({
    role: '',
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
    e.preventDefault()
    setModal({ open: false, body: '' })
    setStatus(0)
    signUp(data)
      .then(status => {
        if (status === 201) {
          setModal({ open: true, body: 'Email de confirmacion enviado. Mira en tu buzon' })
        }

        if (status === 430) {
          setModal({ open: true, body: 'El Email ya estaba registrado. Ingresa en tu cuenta' })
        }
      }).catch(e => console.log(e))
  }

  return (
    <MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form>
        <p className="h5 text-center mb-4">Registro</p>
        <div className="grey-text">
          <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
            success="right" />
          <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
            success="right" />
          <MDBInput label="Confirm your email" icon="exclamation-triangle" group type="text" validate
            error="wrong" success="right" />
          <MDBInput label="Your password" icon="lock" group type="password" validate />
        </div>
        <div className="text-center">
          <MDBBtn color="primary">Register</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
  )

  // return (
  //   <div className="col-md-3 m-auto">
  //     <ModalView show={modalShow.show} message={modalShow.message} onHide={() =>
  //       history.push('/signin')}/>
  //     <div className="row justify-content-center">
  //       <h1>Registro</h1>
  //     </div>
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <div className="form-group mt-5">
  //         <label htmlFor="role">Tipo de Cuenta</label>
  //         <select
  //           name="role"
  //           ref={register({
  //             required: 'Debes elegir entre Estudiante o Empresa'
  //           })}
  //           className="custom-select"
  //         >
  //           <option value="">Elige el tipo de cuenta</option>
  //           <option value="ROLE_STUDENT">Estudiante</option>
  //           <option value="ROLE_COMPANY">Empresa</option>
  //         </select>
  //         {errors.role && <p style={{ color: 'red' }}>{errors.role.message}</p>}
  //       </div>
  //       <div className="form-group mt-5">
  //         <label htmlFor="email">Correo Electrónico</label>
  //         <input
  //           type="email"
  //           name="email"
  //           className="form-control"
  //           ref={register({ required: 'La dirección de correo es necesaria' })}
  //           placeholder="Introduce tu dirección de correo electrónico"
  //         />
  //         {errors.email && (
  //           <p style={{ color: 'red' }}>{errors.email.message}</p>
  //         )}
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="password">Contraseña</label>
  //         <input
  //           type="password"
  //           name="password"
  //           className="form-control"
  //           ref={register({ required: 'La contraseña es necesaria' })}
  //           placeholder="Introduce tu contraseña"
  //         />
  //         {errors.password && (
  //           <p style={{ color: 'red' }}>{errors.password.message}</p>
  //         )}
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="passwordConfirmation">Confirmación Contraseña</label>
  //         <input
  //           type="password"
  //           name="passwordConfirmation"
  //           className="form-control"
  //           placeholder="Vuelve a introducir tu contraseña"
  //           ref={register({
  //             required: 'Por favor, vuelve a introducir tu contraseña ',
  //             validate: {
  //               matchesPreviousPassword: (value) => {
  //                 const { password } = getValues()
  //                 return password === value || 'contraseñas no coinciden'
  //               }
  //             }
  //           })}
  //         />
  //         {errors.passwordConfirmation && (
  //           <p style={{ color: 'red' }}>
  //             {errors.passwordConfirmation.message}
  //           </p>
  //         )}
  //       </div>
  //       <div className="form-group mb-5 mt-4">
  //         <div className="form-check">
  //           <input
  //             type="checkbox"
  //             name="agreement"
  //             className="form-check-input"
  //             ref={register({ required: 'Es necesaria la confirmacion' })}
  //           />
  //           <label className="form-check-label" htmlFor="remember">
  //             Acepto los terminos y condiciones
  //           </label>
  //         </div>
  //         {errors.agreement && (
  //           <p style={{ color: 'red' }}>{errors.agreement.message}</p>
  //         )}
  //       </div>
  //       <div className="form-group">
  //         <button type="submit" className="btn btn-primary w-100">
  //           Registrar
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // )
}
