import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const JobExpRegister = () => {
  const [data, setData] = useState({
    company: '',
    position: '',
    responsibilities: '',
    start_date: '',
    end_date: ''
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
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
      <form className="mt-5">
        <div className="form-group">
          <label htmlFor="company">Empresa</label>
          <input
            type="text"
            name="company"
            className="form-control"
            id="company"
            placeholder="Empresa"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Puesto</label>
          <input
            type="text"
            name="position"
            className="form-control"
            id="position"
            placeholder="Puesto"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="responsibilities">Responsabilidades</label>
          <textarea
            className="form-control"
            id="responsibilities"
            name="responsibilities"
            rows="3"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="row justify-content-between">
          <div className="form-group col-6">
            <label htmlFor="start_date">Fecha de inicio</label>
            <input
              type="month"
              name="start_date"
              className="form-control"
              id="start_date"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6">
            <label htmlFor="end_date">Fecha de finalizacion</label>
            <input
              type="month"
              name="end_date"
              className="form-control"
              id="end_date"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="d-flex mt-5 justify-content-around">
          <button type="submit" className="btn btn-success px-5">
            Guardar
          </button>
          <Link to="/dashboard" className="btn btn-secondary px-5">
            Volver
          </Link>
        </div>
      </form>
      <div className="row mt-5 justify-content-center">
        <button className="btn btn-outline-primary">Agregar otra experiencia de trabajo</button>
      </div>
    </div>
  )
}
