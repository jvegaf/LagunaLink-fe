import React, { useState } from "react";
import { Button } from "react-bootstrap";
import LLTitle from "../LLTitle";
import LLinkLogo from "../LLinkLogo"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Callback method
  };

  return (
    <div className="row col-md-5 m-auto">
      <div className="row col-md-12 justify-content-center mb-2">
        <LLinkLogo />
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="form-group">
          <Button variant="primary" block>Entrar</Button>
        </div>
        <div className="form-group mt-4">
          <p className="text-secondary text-center">¿ Olvidaste tu contraseña ?</p>
        </div>
        <div className="row justify-content-center mt-5">
          <Button variant="outline-primary">Registrarse</Button>
        </div>
      </form>
    </div>
  );
}
