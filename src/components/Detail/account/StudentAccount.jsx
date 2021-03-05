import React from 'react'
import { useStudent } from '../../../hooks/useStudent'
import { useUser } from '../../../hooks/useUser'
import { HeadTitle } from '../../shared/HeadTitle'
import { LLAvatar } from '../../shared/LLAvatar'
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailInput } from '../../Form/EmailInput'
import { TextInput } from '../../Form/TextInput'
import { useSnackbar } from 'notistack'

export const StudentAccount = () => {
  const { name, surname, lastname, updateStudent } = useStudent()
  const { email } = useUser()
  const preloadedValues = { email, name, surname, lastname }
  const methods = useForm({
    defaultValues: preloadedValues,
  })
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = data => {
    updateStudent(data).then(status => {
      if (status !== 200) {
        enqueueSnackbar('Error al intentar guardar los cambios', 'error')
        return
      }
      enqueueSnackbar('Cambios guardados con exito', {variant: 'success'})
    })
  }

  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody className="w-100 d-flex flex-column p-md-5">
          <HeadTitle content="Perfil" />
          <LLAvatar />
          <MDBRow className="justify-content-center">
            <MDBCol md="8" sm="12">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <EmailInput disabled />
                  <TextInput label="Nombre" name="name" />
                  <TextInput label="Primer Apellido" name="surname" />
                  <TextInput label="Segundo Apellido" name="lastname" />
                  {methods.formState.isDirty && (
                    <div className="text-center mt-5">
                      <MDBBtn type="submit" color="default">
                        Guardar
                      </MDBBtn>
                    </div>
                  )}
                </form>
              </FormProvider>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}
