import React from "react";
import { useForm } from "react-hook-form";

export const CompanyRegister = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // logica
  };

  return (
    <div className="col-3 m-auto">
      <div className="row justify-content-center">
        <h1>Registro Empresa</h1>
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
        </div>
        <div className="form-group">
          <label for="description">Descripcion</label>
          <textarea
            class="form-control"
            ref={register({ required: "Es necesario" })}
            name="description"
            rows="3"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            name="address"
            className="form-control"
            ref={register({ required: "Es necesario" })}
            placeholder="Direccion"
          />
        </div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="postalCode">Codigo Postal</label>
              <input
                type="text"
                name="postalCode"
                className="form-control"
                ref={register({ required: "Es necesario" })}
                placeholder="Codigo Postal"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="region">Provincia</label>
              <input
                type="text"
                name="region"
                className="form-control"
                ref={register({ required: "Es necesario" })}
                placeholder="Provincia"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="city">Poblacion</label>
              <input
                type="text"
                name="city"
                className="form-control"
                ref={register({ required: "Es necesario" })}
                placeholder="Poblacion"
              />
            </div>
          </div>
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
