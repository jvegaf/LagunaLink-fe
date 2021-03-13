import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { MDBContainer } from 'mdbreact'
import StarRatings from 'react-star-ratings'

export const RatingInput = ({ componentName, label }) => {
  const { register, watch, setValue } = useFormContext()
  const value = watch(componentName)

  useEffect(() => {
    register({ name: componentName })
  }, [register])

  const handleChange = e => setValue(componentName, e.target.value)

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
          changeRating={handleChange}
          numberOfStars={5}
          name={componentName}
        />
      </div>
    </MDBContainer>
  )
}
