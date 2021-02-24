import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'

export const LanguageRegister = () => {
  const [data, setData] = useState({
    language: '',
    speak_level: 0,
    write_level: 0
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleRatingChange = (rating, name) => {
    setData({
      ...data,
      [name]: rating
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <div className="col-lg-4 bg-white m-auto ll-corners p-5">
      <div className="row justify-content-center">
        <h1>Tu Curriculum</h1>
      </div>
      <div className="row justify-content-center mt-3">
        <p>Indica tus conocimientos de idiomas</p>
      </div>
      <form onSubmit={ onSubmit } className="mt-5">
        <div className="form-group">
          <label htmlFor="language">Idioma</label>
          <input
            type="text"
            name="language"
            onChange={handleInputChange}
            className="form-control"
            placeholder="Idioma"
          />
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row justify-content-center">
              <label>Nivel Oral</label>
            </div>
            <div className="row justify-content-center">
              <StarRatings
                rating={data.speak_level}
                starHoverColor="#0275d8"
                starRatedColor="#0275d8"
                starDimension="25px"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="speak_level"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="row justify-content-center">
              <label>Nivel Escrito</label>
            </div>
            <div className="row justify-content-center">
              <StarRatings
                rating={data.write_level}
                starDimension="25px"
                starHoverColor="#0275d8"
                starRatedColor="#0275d8"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="write_level"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-5">
          <Link className='btn btn-warning w-25' to='/dashboard'>Volver</Link>
          <button type="submit" className="btn btn-success w-50">
            Guardar
          </button>
        </div>
      </form>
      <div className="row mt-5 justify-content-center">
        <button className="btn btn-outline-primary w-50">Agregar otro idioma</button>
      </div>
    </div>
  )
}
