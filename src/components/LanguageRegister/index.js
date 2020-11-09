import React from "react";
import { InputRating } from "../InputRating";

export default function LanguageRegister() {
  return (
    <div className="col-3 m-auto">
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
            className="form-control"
            id="language"
            placeholder="Idioma"
          />
        </div>
        <div className="row">
          <div className="col-6">
            <label>Nivel Oral</label>
            <InputRating name="speak_level"/>
          </div>
          <div className="col-6">
            <label>Nivel Escrito</label>
            <InputRating name="write_level" />
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
}
