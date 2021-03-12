import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact'
import { Title } from '../../../shared/Title'
import { TextInput } from '../../../form/TextInput'
import { FormProvider, useForm } from 'react-hook-form'

export const CompanyRegister = () => {
  const methods = useForm()

  const onSubmit = data => {
  }

  return (
    <MDBCard className="py-3">
      <MDBCardBody className="p-5">
        <Title content="Registro de Empresa" />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TextInput label="Nombre" name="name" />
            <TextInput label="Descripcion" name="description" />
            <TextInput label="Direccion" name="address" />
            <div className="row">
              <div className="col">
                <TextInput label="Provincia" name="region" />
              </div>
              <div className="col">
                <TextInput label="Poblacion" name="city" />
              </div>
              <div className="col">
                <TextInput label="Codigo Postal" name="postalCode" />
              </div>
            </div>
            <div className="text-center mt-5">
              <MDBBtn type="submit" color="default">
                Completar Registro
              </MDBBtn>
            </div>
          </form>
        </FormProvider>
      </MDBCardBody>
    </MDBCard>
  )
}
