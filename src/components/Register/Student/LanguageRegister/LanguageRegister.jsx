import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'
import { Link, useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'

export const LanguageRegister = () => {
  const history = useHistory()
  const { addLanguage } = useStudent()
  const [data, setData] = useState({
    name: '',
    speak: 0,
    write: 0
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
    addLanguage(data)
      .then(status => {
        if (status === 200) {
          history.goBack()
        }
      })
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
          <label htmlFor="name">Idioma</label>
          <input
            type="text"
            name="name"
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
                rating={data.speak}
                starHoverColor="#0275d8"
                starRatedColor="#0275d8"
                starDimension="25px"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="speak"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="row justify-content-center">
              <label>Nivel Escrito</label>
            </div>
            <div className="row justify-content-center">
              <StarRatings
                rating={data.write}
                starDimension="25px"
                starHoverColor="#0275d8"
                starRatedColor="#0275d8"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="write"
              />
            </div>
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
