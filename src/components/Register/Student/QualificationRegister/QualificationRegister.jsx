import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'

export const QualificationRegister = () => {
  const history = useHistory()
  const { addQualification } = useStudent()
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = data => {
    addQualification(data)
      .then(status => {
        if (status === 200) { history.push('/dasboard') }
      })
  }

  return (
    <div className="bg-white ll-corners p-5">
      <div className="row justify-content-center">
        <h1>Tu Curriculum</h1>
      </div>
      <div className="row justify-content-center mt-3">
        <p>Agrega tu ultima titulacion terminada</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="Titulo"
            ref={register({ required: 'Es necesario' })}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>
        <div className="row justify-content-between">
          <div className="form-group col-6">
            <label htmlFor="start_date">Inicio</label>
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
            <label htmlFor="end_date">Finalizacion</label>
            <input
              type="month"
              name="end_date"
              className="form-control"
              id="end_date"
              ref={register({ required: 'Es necesario' })}
            />
            {errors.end_date && <p style={{ color: 'red' }}>{errors.end_date.message}</p>}
          </div>
        </div>
        <div className="d-flex justify-content-around mt-5">
          <Link className='btn btn-warning w-25' to='/dashboard'>Volver</Link>
          <button type="submit" className="btn btn-success w-50">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
