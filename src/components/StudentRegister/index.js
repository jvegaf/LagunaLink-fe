import React from "react";

export default function StudentRegister() {
  return (
    <div className="col-3 m-auto">
      <div className="row justify-content-center">
        <h1>Registro Estudiante</h1>
      </div>
      <div className="row justify-content-center mt-3">
        <p>Completa el registro de tu cuenta</p>
      </div>
      <form className="mt-5">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Nombre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Primer Apellido</label>
          <input
            type="text"
            name="surname"
            className="form-control"
            id="surname"
            placeholder="Apellido 1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Segundo Apellido</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            id="lastname"
            placeholder="Apellido 2"
          />
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
