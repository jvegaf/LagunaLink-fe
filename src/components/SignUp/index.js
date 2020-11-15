import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { SignUpService } from "../../services/auth/SignUpService";

export const SignUp = () => {
  let history = useHistory();
  const { register, getValues, errors, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    SignUpService({
      email: data.email,
      password: data.password,
      role: data.role,
    }).then((status) => {
      if (status === 201) {
        alert("Email de confirmacion enviado. Mira en tu buzon");
        e.target.reset();
        history.push("/signin");
      }

      if (status === 430) {
        alert("El Email ya estaba registrado. Ingresa en tu cuenta");
        e.target.reset();
      }
      
    });
  };

  return (
    <div className="col-md-3 m-auto">
      <div className="row justify-content-center">
        <h1>Registro</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-5">
          <label htmlFor="role">Tipo de Cuenta</label>
          <select
            name="role"
            ref={register({
              required: "Debes elegir entre Estudiante o Empresa",
            })}
            className="custom-select"
          >
            <option value="">Elige el tipo de cuenta</option>
            <option value="ROLE_STUDENT">Estudiante</option>
            <option value="ROLE_COMPANY">Empresa</option>
          </select>
          {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
        </div>
        <div className="form-group mt-5">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            ref={register({ required: "La dirección de correo es necesaria" })}
            placeholder="Introduce tu dirección de correo electrónico"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            ref={register({ required: "La contraseña es necesaria" })}
            placeholder="Introduce tu contraseña"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirmación Contraseña</label>
          <input
            type="password"
            name="passwordConfirmation"
            className="form-control"
            placeholder="Vuelve a introducir tu contraseña"
            ref={register({
              required: "Por favor, vuelve a introducir tu contraseña ",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "contraseñas no coinciden";
                },
              },
            })}
          />
          {errors.passwordConfirmation && (
            <p style={{ color: "red" }}>
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>
        <div className="form-group mb-5 mt-4">
          <div className="form-check">
            <input
              type="checkbox"
              name="agreement"
              className="form-check-input"
              ref={register({ required: "Es necesaria la confirmacion" })}
            />
            <label className="form-check-label" htmlFor="remember">
              Acepto los terminos y condiciones
            </label>
          </div>
          {errors.agreement && (
            <p style={{ color: "red" }}>{errors.agreement.message}</p>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary w-100">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};
