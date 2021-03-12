import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MDBBtn, MDBTypography, MDBCard, MDBCardBody } from 'mdbreact'
import { TextInput } from '../../../form/TextInput'

export const StudentRegister = () => {
  const methods = useForm()

  const onSubmit = () => {
  }

  return (
    <MDBCard className="p-5">
      <MDBCardBody className="p-5">
        <MDBTypography tag="h2" className="text-center mb-5">
          Registro Estudiante
        </MDBTypography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <TextInput name="name" label="Nombre" />
              <TextInput name="surname" label="Primer Apellido" />
              <TextInput name="lastname" label="Segundo Apellido" />
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
