import React from "react";

export default function QualificationRegister() {
  return (
    <div className="col-3 m-auto">
      <div className="row justify-content-center">
        <h1>Tu Curriculum</h1>
      </div>
      <div className="row justify-content-center mt-3">
        <p>Agrega tu ultima titulacion terminada</p>
      </div>
      <form className="mt-5">
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="Titulo"
          />
        </div>
        <div className="row justify-content-between">
          <div className="form-group col-6">
            <label htmlFor="start_date">Fecha de inicio</label>
            <input
              type="month"
              name="start_date"
              className="form-control"
              id="start_date"
            />
          </div>
          <div className="form-group col-6">
            <label htmlFor="end_date">Fecha de finalizacion</label>
            <input
              type="month"
              name="end_date"
              className="form-control"
              id="end_date"
            />
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
