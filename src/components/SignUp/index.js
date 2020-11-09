import React from "react";

export default function SignUp() {
  return (
    <div className="col-md-6 m-auto">
      <div className="row justify-content-center">
        <h1>Registro</h1>
      </div>
      <form>
        <div className="form-group my-5">
          <select class="custom-select">
            <option selected>Elige el tipo de cuenta</option>
            <option value="1">Estudiante</option>
            <option value="2">Empresa</option>
          </select>
        </div>
        <div className="form-group my-5">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Introduce tu dirección de correo electrónico"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Introduce tu Contraseña"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirmación Contraseña</label>
          <input
            type="password"
            name="password2"
            className="form-control"
            id="confirmpassword"
            placeholder="Vuelve a introducir tu contraseña"
          />
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              name="checkbox"
              className="form-check-input"
              id="remember"
            />
            <label className="form-check-label" htmlFor="remember">
              Acepto los terminos y condiciones
            </label>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary w-100">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
