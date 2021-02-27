import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'

export const JobExpRegister = () => {
  const history = useHistory()
  const { register, errors, handleSubmit } = useForm()
  const { addJobExperience } = useStudent()

  const onSubmit = (data) => {
    addJobExperience(data).then(status => {
      if (status === 200) {
        history.goBack()
      }
    })
  }

  return (
    <div className="m-auto bg-white p-5 ll-corners">
      <div className="row justify-content-center">
        <h1>Tu Curriculum</h1>
      </div>
      <div className="row justify-content-center mt-3">
        <p>Agrega tus experiencias de trabajo</p>
      </div>
      <form onSubmit={ handleSubmit(onSubmit) } className="mt-5">
        <div className="form-group">
          <label htmlFor="company">Empresa</label>
          <input
            type="text"
            name="company"
            className="form-control"
            id="company"
            placeholder="Empresa"
            ref={register({ required: 'Es necesario' })}
          />
          {errors.company && <p style={{ color: 'red' }}>{errors.company.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="position">Puesto</label>
          <input
            type="text"
            name="position"
            className="form-control"
            id="position"
            placeholder="Puesto"
            ref={register({ required: 'Es necesario' })}
          />
          {errors.position && <p style={{ color: 'red' }}>{errors.position.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="responsibilities">Responsabilidades</label>
          <textarea
            className="form-control"
            id="responsibilities"
            name="responsibilities"
            rows="3"
            ref={register({ required: 'Es necesario' })}
          ></textarea>
          {errors.responsibilities && <p style={{ color: 'red' }}>{errors.responsibilities.message}</p>}
        </div>
        <div className="row justify-content-between">
          <div className="form-group col-6">
            <label htmlFor="start_date">Fecha de inicio</label>
            <input
              type="month"
              name="start_date"
              className="form-control"
              id="start_date"
              ref={register({ required: 'Es necesario' })}
            />
            {errors.start_date && <p style={{ color: 'red' }}>{errors.start_date.message}</p>}
          </div>
          <div className="form-group col-6">
            <label htmlFor="end_date">Fecha de finalizacion</label>
            <input
              type="month"
              name="end_date"
              className="form-control"
              id="end_date"
              ref={register({ required: 'Es necesario' })}
            />
          </div>
        </div>
        <div className="d-flex justify-content-around mt-5">
          <Link className='btn btn-outline-warning w-25' to='/dashboard'>Volver</Link>
          <button type="submit" className="btn btn-success w-50">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
