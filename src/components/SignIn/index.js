import React, { useState } from "react";
import LLTitle from "../LLTitle";
import LLinkLogo from "../LLinkLogo"
import { Link } from "react-router-dom";


export const SignIn = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="row col-md-5 m-auto">
      <div className="row col-md-12 justify-content-center mb-2">
        <LLinkLogo size="70px"/>
      </div>
      <div className="row mx-auto mb-4">
        <LLTitle />
      </div>
      <form onSubmit={handleSubmit} className="col-md-12 mx-auto">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Correo Electronico"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-4 mb-5">
          <Link to="/reset" className="text-secondary text-center">¿ Olvidaste tu contraseña ?</Link>
        </div>
        <div className="row justify-content-center mt-5">
          <Link to="/signup" className="text-secondary">Registrarse</Link>
        </div>
      </form>
    </div>
  );
}
