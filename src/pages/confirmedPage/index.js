import React from "react";
import { Link } from "react-router-dom";
import "../__shared__/styles.css";

export const confirmedPage = () => {
  return (
    <div className="col-12 center">
      <div className="col-md-4 m-auto">
        <div className="h400 border border-secondary">
          <div className="row justify-content-center mt-5">
            <h2>Cuenta activada</h2>
          </div>
          <div className="row justify-content-center mt-4 p-3">
            <p>
              Gracias por confirmar tu cuenta, ahora puedes continuar con el
              registro
            </p>
          </div>
          <div className="row justify-content-center mt-4">
            <Link to='/signin' className="btn btn-primary px-5">Volver</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
