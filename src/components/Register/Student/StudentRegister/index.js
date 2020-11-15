import React from "react";
import { useForm } from "react-hook-form";

export const StudentRegister = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // logica
  };

  return (
    <div className="col-3 m-auto">
      <div className="row justify-content-center">
        <h1>Registro Estudiante</h1>
      </div>
      <div className="row justify-content-center mt-3">
        <p>Completa el registro de tu cuenta</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            ref={register({ required: "Es necesario" })}
            placeholder="Nombre"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="surname">Primer Apellido</label>
          <input
            type="text"
            name="surname"
            className="form-control"
            ref={register({ required: "Es necesario" })}
            placeholder="Apellido 1"
          />
          {errors.surname && (
            <p style={{ color: "red" }}>{errors.surname.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Segundo Apellido</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            ref={register({ required: "Es necesario" })}
            placeholder="Apellido 2"
          />
          {errors.lastname && (
            <p style={{ color: "red" }}>{errors.lastname.message}</p>
          )}
        </div>
        <div className="form-group mt-5">
          <button type="submit" className="btn btn-primary w-100">
            Completar Registro
          </button>
        </div>
      </form>
    </div>
  );
};
