import React from 'react';

export default function SignUp() {
    return (
        <div className="col-md-6 m-auto">
        <form>
          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Introduce tu direcion de correo electronico" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="Introduce tu Contraseña" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpassword">Contraseña</label>
            <input type="password" name="password2" className="form-control" id="confirmpassword" placeholder="Vuelve a introducir tu contraseña" />
          </div>
          <div className="form-check">
            <input type="checkbox" name="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Acepto los terminos y condiciones
            </label>
          </div>
          <button type="submit" className="btn btn-primary float-right">
            Registrar
          </button>
        </form>
      </div>
    );
}