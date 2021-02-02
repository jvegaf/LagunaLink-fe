import React, { useContext, useState } from 'react'
import LLTitle from '../LLTitle'
import LLinkLogo from '../LLinkLogo'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ModalView } from '../ModalView'
import { useUser } from './../../hooks/useUser'

export function SignIn () {
  const history = useHistory()
  const { register, errors, handleSubmit } = useForm()
  const [modalShow, setModalShow] = useState({
    show: false,
    message: ''
  })

  const { isSigned, signIn, statusError, setStatusError } = useUser()

  const [] = useUser
  const [authError, setAuthError] = useState(false)

  const onSubmit = (data) => {
    signIn(data.email, data.password)
  }

  useEffect(() => {
    if(isSigned) 
  }, [input])

  return (
    <div className="row col-md-5 m-auto">
      <ModalView show={modalShow.show} message={modalShow.message} onHide={() =>
        setModalShow(false, '')} />
      <div className="row col-md-12 justify-content-center mb-2">
        <LLinkLogo size="70px" />
      </div>
      <div className="row mx-auto mb-4">
        <LLTitle />
      </div>
      <div className="row mx-auto mb-4">
        {authError && <p style={{ color: 'red' }}>Correo o Contraseña erroneos</p>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="col-md-12 mx-auto">
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Correo Electronico"
            ref={register({ required: 'La dirección de correo es necesaria' })}
          />
          {errors.email && (
            <p style={{ color: 'red' }}>{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Contraseña"
            ref={register({ required: 'La contraseña es necesaria' })}
          />
          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </div>
        <div className="form-group mt-4 mb-5">
          <Link to="/reset" className="text-secondary text-center">
            ¿ Olvidaste tu contraseña ?
          </Link>
        </div>
        <div className="row justify-content-center mt-5">
          <Link to="/signup" className="text-secondary">
            Registrarse
          </Link>
        </div>
      </form>
    </div>
  )
}
