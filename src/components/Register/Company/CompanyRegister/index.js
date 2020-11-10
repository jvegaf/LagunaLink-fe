import React, {useState} from 'react'

export const CompanyRegister = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    address: "",
    postalCode: "",
    region: "",
    city: "",
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="col-3 m-auto">
      <div className="row justify-content-center">
        <h1>Registro Empresa</h1>
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
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label for="description">Descripcion</label>
          <textarea
              class="form-control"
              id="description"
              name="description"
              rows="3"
              onChange={handleInputChange}
            ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            name="address"
            className="form-control"
            id="address"
            placeholder="Direccion"
            onChange={handleInputChange}
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
            id="postalCode"
            placeholder="Codigo Postal"
            onChange={handleInputChange}
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
            id="region"
            placeholder="Provincia"
            onChange={handleInputChange}
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
            id="city"
            placeholder="Poblacion"
            onChange={handleInputChange}
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
  )
}
