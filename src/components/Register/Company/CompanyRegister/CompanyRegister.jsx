import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Context from '../../../../context/UserContext'
import { RegisterService } from '../../../../services/register/RegisterService'

export const CompanyRegister = () => {
  const token = useContext(Context).token
  const path = '/companies'
  const { register, errors, handleSubmit } = useForm()
  const history = useHistory()

  const onSubmit = (data) => {
    RegisterService({ token, data, path }).then((status) => {
      if (status === 201) history.push('/main')
    })
  }
  return (
    <div className="col-md-8 col-lg-5 bg-white p-lg-5 ll-corners">
      <div className="row justify-content-center">
        <h1>Registro Empresa</h1>
      </div>
      <div className="row justify-content-center mt-3">
        <p>Completa el registro de tu cuenta</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            ref={register({ required: 'Es necesario' })}
            placeholder="Nombre"
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <textarea
            className="form-control"
            ref={register({ required: 'Es necesario' })}
            name="description"
            rows="3"
          ></textarea>
          {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            name="address"
            className="form-control"
            ref={register({ required: 'Es necesario' })}
            placeholder="Direccion"
          />
          {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
        </div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="postalCode">Codigo Postal</label>
              <input
                type="text"
                name="postalCode"
                className="form-control"
                ref={register({ required: 'Es necesario' })}
                placeholder="Codigo Postal"
              />
            </div>
            {errors.postalCode && <p style={{ color: 'red' }}>{errors.postalCode.message}</p>}
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="region">Provincia</label>
              <input
                type="text"
                name="region"
                className="form-control"
                ref={register({ required: 'Es necesario' })}
                placeholder="Provincia"
              />
              {errors.region && <p style={{ color: 'red' }}>{errors.region.message}</p>}
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="city">Poblacion</label>
              <input
                type="text"
                name="city"
                className="form-control"
                ref={register({ required: 'Es necesario' })}
                placeholder="Poblacion"
              />
              {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
            </div>
          </div>
        </div>
        <div className="form-group mt-5">
          <button type="submit" className="btn btn-primary w-100">
            Completar Registro
          </button>
        </div>
      </form>
    </div>
  )
}
