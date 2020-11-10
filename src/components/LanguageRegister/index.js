import React, { useState } from "react";
import StarRatings from 'react-star-ratings'

export const LanguageRegister = () => {
  const [data, setData] = useState({
    language: "",
    speak_level: 0,
    write_level: 0,
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleRatingChange = (rating, name) => {
    setData({
      ...data,
      [name]: rating
    });
  };

  return (
    <div className="col-3 m-auto p-0">
      <div className="row justify-content-center">
        <h1>Tu Curriculum</h1>
      </div>
      <div className="row justify-content-center mt-3">
        <p>Indica tus conocimientos de idiomas</p>
      </div>
      <form className="mt-5">
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
        <div className="form-group mt-5">
          <button type="submit" className="btn btn-primary w-100">
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
