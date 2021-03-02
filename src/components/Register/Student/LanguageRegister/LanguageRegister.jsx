import React, { useState } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBNavLink, MDBRow } from 'mdbreact'
import StarRatings from 'react-star-ratings'
import { useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'
import { HeadTitle } from '../../../shared/HeadTitle'

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

    <MDBContainer>
    <MDBRow className="justify-content-center">
      <MDBCol md="7" sm="12">
        <HeadTitle content="Tu Curriculum"/>
        <form onSubmit={onSubmit}>
          <p className="h5 text-center mb-4"></p>
          <div className="grey-text">
            <MDBInput label="Idioma" icon="envelope"
            group type="text" validate error="wrong" name="name"
              onChange={handleInputChange} success="right" />
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
          </div>
          <div className="text-center">
            <MDBBtn type="submit" color="default">Guardar</MDBBtn>
          </div>
        </form>
        <MDBNavLink to='/dashboard' className="mt-5 text-center" >Volver</MDBNavLink>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  )
}
