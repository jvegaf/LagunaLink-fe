import React from 'react'
import { useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'
import { FormProvider, useForm } from 'react-hook-form'
import { MDBBtn, MDBTypography, MDBCard, MDBCardBody } from 'mdbreact'
import { TextInput } from '../../../Form/TextInput'

export const StudentRegister = () => {
  const { registerStudent } = useStudent()
  const methods = useForm()
  const history = useHistory()

  const onSubmit = data => {
    registerStudent(data).then(status => {
      if (status === 201) history.push('/main')
    })
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
