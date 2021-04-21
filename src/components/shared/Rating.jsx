import React from 'react'
import { MDBContainer } from 'mdbreact'
import StarRatings from 'react-star-ratings'

export const Rating = ({ value, label }) => {

  return (
    <MDBContainer>
      <div className="row justify-content-center">
        <label>{label}</label>
      </div>
      <div className="row justify-content-center">
        <StarRatings
          rating={value}
          starHoverColor="#0275d8"
          starRatedColor="#0275d8"
          starDimension="25px"
          numberOfStars={5}
        />
      </div>
    </MDBContainer>
  )
}
