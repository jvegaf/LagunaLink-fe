import React from 'react'
import { useStudent } from '../../../hooks/useStudent'
import { useUser } from '../../../hooks/useUser'
import { HeadTitle } from '../../shared/HeadTitle'
import { LLAvatar } from '../../shared/LLAvatar'
import { MDBBtn } from 'mdbreact'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailInput } from '../../form/EmailInput'
import { TextInput } from '../../form/TextInput'
import { useSnackbar } from 'notistack'
import { makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    maxWidth: 600
  }
}))

export const StudentAccount = () => {
  const classes = useStyles()
  const {name, surname, lastname, updateStudent, getStudentProfile} = useStudent()
  const {email} = useUser()
  const preloadedValues = {email, name, surname, lastname}
  const methods = useForm({
    defaultValues: preloadedValues
  })
  const {enqueueSnackbar} = useSnackbar()

  const onSubmit = data => {
    updateStudent(data).then(status => {
      if (status !== 200) {
        enqueueSnackbar('No se han podido guardar los cambios', {variant: 'error'})
        return
      }
      enqueueSnackbar('Cambios guardados con exito', {variant: 'success'})
      getStudentProfile()
    })
  }

  return (
    <Paper className={classes.root} elevation={6}>
      <HeadTitle content="Perfil"/>
      <div className="row justify-content-center">
        <LLAvatar/>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <EmailInput disabled/>
          <TextInput label="Nombre" name="name"/>
          <div className="row">
            <div className="col">
              <TextInput label="Primer Apellido" name="surname"/>
            </div>
            <div className="col">
              <TextInput label="Segundo Apellido" name="lastname"/>
            </div>
          </div>
          {methods.formState.isDirty && (
            <div className="d-block text-center mt-5">
              <MDBBtn type="submit" color="default">
                Guardar
              </MDBBtn>
            </div>
          )}
        </form>
      </FormProvider>
    </Paper>
  )
}
